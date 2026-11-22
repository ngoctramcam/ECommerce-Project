import React from "react";
import { Link } from "react-router-dom";

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

export default function BookCard({ book, onAddToCart }) {
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(
        book.price || 0,
    );

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Nếu component cha có truyền hàm xử lý riêng thì ưu tiên dùng
        if (onAddToCart) {
            onAddToCart(book);
            return;
        }

        // Kiểm tra đăng nhập
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            return;
        }

        const user = JSON.parse(storedUser);
        const productId = book.product_id ?? book.id;

        try {
            const res = await fetch("/api/cart/add", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({
                    user_id: user.id,
                    product_id: productId,
                    qty: 1,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                alert(data.message || "Không thể thêm vào giỏ hàng.");
                return;
            }

            alert(`Đã thêm "${book.product_name}" vào giỏ hàng!`);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Lỗi khi thêm giỏ hàng:", error);
            alert("Có lỗi xảy ra khi kết nối máy chủ.");
        }
    };

    return (
        // [NGÀY 9 - Responsive 360px]:
        // - min-w-0 overflow-hidden: Khóa chiều rộng thẻ sách, không cho chữ/ảnh bên trong đẩy phình cột lưới 2 cột
        // - p-2.5 sm:p-4: Giảm lề trong thẻ từ 12px xuống 10px trên màn 360px để bìa sách và nút bấm rộng rãi hơn
        <div className="min-w-0 overflow-hidden bg-white border border-gray-200 rounded-xl p-2.5 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
                {/* Bấm vào ảnh bìa để chuyển sang trang chi tiết sách */}
                <Link
                    to={`/books/${book.product_id}`}
                    className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center"
                >
                    {book.image ? (
                        <img
                            src={book.image}
                            alt={book.product_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center text-gray-400 px-2">
                            <span className="text-2xl block mb-1">📘</span>
                            <span className="text-[11px]">Bìa sách</span>
                        </div>
                    )}
                </Link>

                {/* Bấm vào tên sách để chuyển sang trang chi tiết sách */}
                <Link to={`/books/${book.product_id}`}>
                    <h3
                        className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1 hover:text-emerald-700 transition-colors"
                        title={book.product_name}
                    >
                        {book.product_name}
                    </h3>
                </Link>

                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {book.author || "Đang cập nhật"}
                </p>
            </div>

            <div className="mt-3">
                <p className="text-emerald-700 font-bold text-sm sm:text-base mb-2.5">
                    {formattedPrice} đ
                </p>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
