// - Lấy chi tiết 1 cuốn sách từ API của TV4 (/api/products/{id})
// - Lấy 4 sách cùng danh mục từ API tìm kiếm TM-02 của TV3 (/api/books/search)
// - Thêm vào giỏ hàng qua API TM-05 của TV5 (/api/cart/add)
// - Khối đánh giá sản phẩm dùng dữ liệu giả (mock data) thêm vào cho khớp giao diện Figma

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// Tái sử dụng component thẻ sách có sẵn tại resources/js/components/BookCard.jsx
import BookCard from "../components/BookCard";

// [Lấy từ BookCard.jsx] Hàm đọc CSRF token từ thẻ <meta> của Laravel để gửi kèm request POST
const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

// [Tự thêm - Dữ liệu giả] Danh sách bình luận mẫu theo thiết kế
const DUMMY_REVIEWS = [
    {
        id: 1,
        author: "Nguyễn Văn A",
        rating: 5,
        comment:
            "Một cuốn sách nhẹ nhàng, giúp tôi tìm lại sự bình yên sau những ngày bận rộn.",
    },
    {
        id: 2,
        author: "Trần Thu Hà",
        rating: 4,
        comment:
            "Văn phong gần gũi, nhiều đoạn khiến tôi muốn đọc lại thật chậm.",
    },
];

export default function BookDetailPage() {
    // Lấy tham số :id trên URL (khai báo ở <Route path="/books/:id" /> trong resources/js/app.jsx)
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // State quản lý trạng thái nút Thêm vào giỏ hàng (TM-05)
    const [adding, setAdding] = useState(false);
    const [cartMessage, setCartMessage] = useState({ type: "", text: "" });

    // [Yêu cầu TM-03 Ngày 8] Định dạng giá tiền chuẩn VNĐ (ví dụ: 120.000 ₫)[cite: 2]
    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(Number(price || 0)) + " ₫";
    };

    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        setQuantity(1);
        setCartMessage({ type: "", text: "" });
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 1. [Lấy từ API - TV4] Gọi GET /api/products/{id} (ProductController@show trong routes/web.php)
        axios
            .get(`/api/products/${id}`)
            .then(async (res) => {
                // Hỗ trợ cả 2 kiểu trả về của Laravel Resource (res.data hoặc res.data.data)
                const currentBook = res.data?.data || res.data;
                if (!currentBook) {
                    setNotFound(true);
                    return;
                }
                setProduct(currentBook);

                // 2. [Tận dụng API TM-02 của TV3] Gọi GET /api/books/search?categoryId=... (ProductService@search)
                // để lấy tối đa 4 cuốn sách cùng danh mục theo yêu cầu Ngày 8
                if (currentBook.category_id) {
                    try {
                        const relatedRes = await axios.get(
                            "/api/books/search",
                            {
                                params: { categoryId: currentBook.category_id },
                            },
                        );
                        const list = relatedRes.data?.data || [];
                        const currentId = String(
                            currentBook.product_id ?? currentBook.id,
                        );
                        // Loại bỏ chính cuốn sách đang xem và cắt lấy đúng 4 cuốn
                        const filtered = list
                            .filter(
                                (item) =>
                                    String(item.product_id ?? item.id) !==
                                    currentId,
                            )
                            .slice(0, 4);
                        setRelatedBooks(filtered);
                    } catch (relatedErr) {
                        console.error(
                            "Lỗi khi tải sách cùng danh mục:",
                            relatedErr,
                        );
                    }
                }
            })
            .catch((err) => {
                console.error("Lỗi khi tải chi tiết sách:", err);
                setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [id]);

    // Đọc cột stock và status từ bảng products để xác định trạng thái còn hàng hay hết hàng
    const stock = Number(product?.stock ?? 0);
    const isInactive = product?.status === 0 || product?.status === false;
    const isUnavailable = stock <= 0 || isInactive;

    // Giới hạn số lượng chọn mua trong khoảng [1 .. stock]
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => (prev < stock ? prev + 1 : stock));
    };

    // 3. [Gọi API TM-05- TV5] Gửi POST /api/cart/add (CartController@add & CartService@add)[cite: 2]
    const handleAddToCart = async () => {
        if (!product || isUnavailable || adding) return;

        // [Lấy cách kiểm tra đăng nhập từ BookCard.jsx] Đọc thông tin user lưu trong localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }

        const user = JSON.parse(storedUser);
        const productId = product.product_id ?? product.id;

        setAdding(true);
        setCartMessage({ type: "", text: "" });

        try {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                // Truyền đúng 3 trường mà CartController@add của TV5 yêu cầu: user_id, product_id, qty
                body: JSON.stringify({
                    user_id: user.id,
                    product_id: productId,
                    qty: quantity,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setCartMessage({
                    type: "error",
                    text: data.message || "Không thể thêm vào giỏ hàng.",
                });
                return;
            }

            // [Kết nối với Header.jsx] Bắn sự kiện "cartUpdated" để Header tự động cập nhật số lượng trên icon Giỏ hàng
            window.dispatchEvent(new Event("cartUpdated"));

            setCartMessage({
                type: "success",
                text: `Đã thêm ${quantity} cuốn "${product.product_name}" vào giỏ hàng!`,
            });
        } catch (error) {
            console.error("Lỗi khi thêm giỏ hàng:", error);
            setCartMessage({
                type: "error",
                text: "Có lỗi xảy ra khi kết nối máy chủ.",
            });
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
                Đang tải thông tin sách...
            </div>
        );
    }

    if (notFound || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <p className="text-gray-700 font-medium mb-3">
                    Không tìm thấy cuốn sách này.
                </p>
                <Link
                    to="/books"
                    className="text-sm text-emerald-700 hover:underline font-medium"
                >
                    Quay lại danh sách sách
                </Link>
            </div>
        );
    }

    // Lấy tên danh mục từ quan hệ category (nếu API trả kèm) hoặc fallback về "Sách"
    const categoryName =
        product.category?.category_name || product.category_name || "Sách";

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 space-y-6 pb-20 md:pb-10">
            {/* Thanh điều hướng Breadcrumb (liên kết về Trang chủ và trang lọc danh mục TM-02) */}
            <nav className="text-xs text-gray-500">
                <Link to="/" className="hover:text-emerald-700">
                    Trang chủ
                </Link>
                <span className="mx-1.5">/</span>
                <Link
                    to={
                        product.category_id
                            ? `/books?categoryId=${product.category_id}`
                            : "/books"
                    }
                    className="hover:text-emerald-700"
                >
                    {categoryName}
                </Link>
                <span className="mx-1.5">/</span>
                <span className="text-gray-700">{product.product_name}</span>
            </nav>

            {/* Khối chính: Ảnh bìa (cột image) & Thông tin sản phẩm (product_name, author, publisher, price, stock) */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start">
                    {/* Cột trái: Ảnh bìa sách lấy từ cột product.image */}
                    {/* [NGÀY 9 - Responsive 360px]: Thu gọn nhẹ padding và khung ảnh bìa (w-44 h-60) cho vừa màn 360px */}
                    <div className="md:col-span-5 bg-emerald-50/60 rounded-xl p-4 sm:p-6 flex items-center justify-center">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.product_name}
                                className="w-52 sm:w-64 h-72 sm:h-80 object-cover rounded-lg shadow-md"
                            />
                        ) : (
                            <div className="w-52 sm:w-64 h-72 sm:h-80 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400">
                                <span className="text-4xl mb-2">📘</span>
                                <span className="text-xs">Chưa có ảnh bìa</span>
                            </div>
                        )}
                    </div>

                    {/* Cột phải: Thông tin chi tiết & Nút thêm vào giỏ (TM-05) */}
                    {/* [NGÀY 9 - Responsive 360px]: Thêm min-w-0 để nội dung chữ không đẩy tràn cột */}
                    <div className="md:col-span-7 min-w-0 space-y-4">
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                            {categoryName}
                        </span>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                            {product.product_name}
                        </h1>

                        {/* Tác giả (product.author) & Nhà xuất bản (product.publisher) */}
                        <div className="space-y-1.5 text-sm text-gray-600">
                            <div className="flex gap-6">
                                <span className="w-24 text-gray-400">
                                    Tác giả
                                </span>
                                <span className="font-medium text-gray-800">
                                    {product.author || "Đang cập nhật"}
                                </span>
                            </div>
                            <div className="flex gap-6">
                                <span className="w-24 text-gray-400">
                                    Nhà xuất bản
                                </span>
                                <span className="font-medium text-gray-800">
                                    {product.publisher || "Đang cập nhật"}
                                </span>
                            </div>
                        </div>

                        {/* Giá bán lấy từ cột product.price */}
                        <div className="pt-2 pb-3 border-b border-gray-100">
                            <span className="text-2xl sm:text-3xl font-bold text-emerald-700">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        {/* Trạng thái tồn kho lấy từ cột product.stock và product.status */}
                        <div className="text-xs sm:text-sm font-medium">
                            {isInactive ? (
                                <span className="text-red-600">
                                    Ngừng kinh doanh
                                </span>
                            ) : stock <= 0 ? (
                                <span className="text-red-600">Hết hàng</span>
                            ) : (
                                <span className="text-emerald-700">
                                    Còn lại: {stock}
                                </span>
                            )}
                        </div>

                        {/* Bộ chọn số lượng mua */}
                        <div className="flex items-center gap-6 pt-1">
                            <span className="text-sm text-gray-700 font-medium">
                                Số lượng
                            </span>
                            <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white">
                                <button
                                    type="button"
                                    disabled={isUnavailable || quantity <= 1}
                                    onClick={handleDecrease}
                                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="w-10 text-center text-sm font-semibold text-gray-800">
                                    {isUnavailable ? 0 : quantity}
                                </span>
                                <button
                                    type="button"
                                    disabled={
                                        isUnavailable || quantity >= stock
                                    }
                                    onClick={handleIncrease}
                                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Nút gọi hàm handleAddToCart -> API /api/cart/add (TM-05- TV5) */}
                        <div className="pt-2">
                            <button
                                type="button"
                                disabled={isUnavailable || adding}
                                onClick={handleAddToCart}
                                className="w-full sm:w-64 py-2.5 px-6 rounded-lg border border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isInactive
                                    ? "Ngừng kinh doanh"
                                    : stock <= 0
                                      ? "Tạm hết hàng"
                                      : adding
                                        ? "Đang thêm..."
                                        : "Thêm vào giỏ hàng"}
                            </button>
                        </div>

                        {/* Hiển thị thông báo kết quả trả về từ API giỏ hàng */}
                        {cartMessage.text && (
                            <p
                                className={`text-xs sm:text-sm font-medium ${
                                    cartMessage.type === "success"
                                        ? "text-emerald-700"
                                        : "text-red-600"
                                }`}
                            >
                                {cartMessage.text}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Thẻ Mô tả sản phẩm lấy từ cột product.description */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                    Mô tả sản phẩm
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description || "Chưa có mô tả cho cuốn sách này."}
                </p>
            </div>

            {/* [Tự thêm - Dữ liệu giả] Khối Đánh giá sản phẩm render từ mảng DUMMY_REVIEWS ở đầu file */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Đánh giá sản phẩm
                    </h2>
                    <div className="flex items-center gap-1 text-lg sm:text-xl font-bold text-gray-900">
                        <span>4,7</span>
                        <span className="text-amber-400">★</span>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 border-l-2 border-gray-100 pl-4 space-y-4">
                    {DUMMY_REVIEWS.map((review, index) => (
                        <div
                            key={review.id}
                            className={index > 0 ? "pt-4" : ""}
                        >
                            <p className="text-sm font-semibold text-gray-800">
                                {review.author}
                            </p>
                            <div className="text-amber-400 text-xs my-1">
                                {"★".repeat(review.rating)}
                                {"☆".repeat(5 - review.rating)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* [Yêu cầu TM-03 ] Mục Sách cùng danh mục (4 cuốn), tái sử dụng component BookCard.jsx */}
            {relatedBooks.length > 0 && (
                <section className="pt-2">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                        Sách cùng danh mục
                    </h2>
                    {/* [NGÀY 9 - Responsive 360px]: Chỉnh gap-2.5 trên mobile để 2 cột sách cùng danh mục vừa khít 360px */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
                        {relatedBooks.map((item) => (
                            <BookCard
                                key={item.product_id ?? item.id}
                                book={item}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
