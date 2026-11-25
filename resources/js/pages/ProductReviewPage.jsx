import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("vi-VN") + "đ";

const StarRow = ({ rating = 5, interactive = false, onSelect }) => {
    const [hover, setHover] = useState(0);

    return (
        <div
            className="inline-flex items-center gap-1"
            role={interactive ? "radiogroup" : undefined}
        >
            {[1, 2, 3, 4, 5].map((value) => {
                const activeValue = interactive ? hover || rating : rating;
                const filled = value <= activeValue;

                if (!interactive) {
                    return (
                        <span
                            key={value}
                            className={`text-sm leading-none ${
                                filled ? "text-amber-400" : "text-gray-200"
                            }`}
                        >
                            ★
                        </span>
                    );
                }

                return (
                    <button
                        key={value}
                        type="button"
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => onSelect?.(value)}
                        aria-label={`${value} sao`}
                        className={`text-xl leading-none transition-transform hover:scale-110 cursor-pointer ${
                            filled ? "text-amber-400" : "text-gray-200"
                        }`}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default function ProductReviewPage() {
    const { orderId } = useParams();
    const location = useLocation();

    const [order, setOrder] = useState(location.state?.order || null);
    const [loadingOrder, setLoadingOrder] = useState(!location.state?.order);

    const items = Array.isArray(order?.items) ? order.items : [];
    const [selectedProductId, setSelectedProductId] = useState(
        location.state?.order?.items?.[0]?.product_id || "",
    );

    const [star, setStar] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);

    // Nếu mở trực tiếp URL mà chưa có state từ MyOrdersPage thì tải lại đơn hàng
    useEffect(() => {
        if (order || !orderId) {
            setLoadingOrder(false);
            return;
        }

        let cancelled = false;
        setLoadingOrder(true);
        axios
            .get("/api/orders")
            .then((res) => {
                if (cancelled) return;
                const list = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];
                const found = list.find(
                    (o) => String(o.id ?? o.order_id) === String(orderId),
                );
                setOrder(found || null);
                const firstProdId = found?.items?.[0]?.product_id;
                if (firstProdId) setSelectedProductId(firstProdId);
            })
            .catch((err) => console.error("Lỗi tải đơn hàng:", err))
            .finally(() => !cancelled && setLoadingOrder(false));

        return () => {
            cancelled = true;
        };
    }, [order, orderId]);

    useEffect(() => {
        if (items.length > 0 && !selectedProductId) {
            setSelectedProductId(items[0].product_id);
        }
    }, [items, selectedProductId]);

    // Tải danh sách đánh giá theo sản phẩm đang chọn
    const fetchReviews = async (productId) => {
        if (!productId) {
            setReviews([]);
            return;
        }
        setLoadingReviews(true);
        try {
            const res = await axios.get(`/api/products/${productId}/ratings`);
            const raw = res.data?.data;
            const list = Array.isArray(raw) ? raw : raw?.data || [];
            setReviews(list);
        } catch (err) {
            console.error("Lỗi tải danh sách đánh giá:", err);
            setReviews([]);
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchReviews(selectedProductId);
    }, [selectedProductId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setFeedback(null);

        if (!selectedProductId) {
            setFeedback({
                type: "error",
                text: "Không xác định được sản phẩm cần đánh giá.",
            });
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`/api/products/${selectedProductId}/ratings`, {
                star,
                comment: comment.trim(),
            });
            setComment("");
            setStar(5);
            setFeedback({
                type: "success",
                text: "Gửi đánh giá sản phẩm thành công.",
            });
            await fetchReviews(selectedProductId);
        } catch (err) {
            if (err.response?.status === 401) {
                setFeedback({
                    type: "error",
                    text: "Vui lòng đăng nhập để gửi đánh giá.",
                });
            } else {
                const msg =
                    err.response?.data?.message ||
                    err.response?.data?.errors?.star?.[0] ||
                    err.response?.data?.errors?.comment?.[0] ||
                    "Không thể gửi đánh giá. Vui lòng thử lại.";
                setFeedback({ type: "error", text: msg });
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingOrder) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center text-sm text-gray-500">
                Đang tải thông tin đánh giá...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
                <Link
                    to="/"
                    className="hover:text-emerald-700 transition-colors"
                >
                    Trang chủ
                </Link>
                <span>/</span>
                <Link
                    to="/profile"
                    className="hover:text-emerald-700 transition-colors"
                >
                    Tài khoản
                </Link>
                <span>/</span>
                <Link
                    to="/orders"
                    className="hover:text-emerald-700 transition-colors"
                >
                    Đơn hàng của tôi
                </Link>
                <span>/</span>
                <span className="text-gray-600">Đánh giá sản phẩm</span>
            </nav>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Đánh giá sản phẩm
            </h1>

            {/* Thẻ thông tin đơn hàng */}
            {order && (
                <div className="bg-white border-2 border-sky-400 sm:border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                    <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-start sm:items-center justify-between gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                                #{order.order_code || order.id}
                            </span>
                            {order.order_date && (
                                <span className="text-xs text-gray-400">
                                    Ngày đặt: {order.order_date}
                                </span>
                            )}
                        </div>
                        <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shrink-0">
                            Hoàn thành
                        </span>
                    </div>

                    <div className="px-4 sm:px-6 py-3 bg-gray-50/80 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-600">
                        <div className="space-y-0.5">
                            <p>
                                Người nhận:{" "}
                                <span className="font-medium text-gray-800">
                                    {order.receiver_name} (
                                    {order.receiver_phone})
                                </span>
                            </p>
                            <p>Địa chỉ: {order.shipping_address}</p>
                        </div>
                        <div className="sm:text-right">
                            <span>
                                Thanh toán:{" "}
                                <strong className="font-medium text-gray-800">
                                    {order.payment_method || "COD"}
                                </strong>
                            </span>
                        </div>
                    </div>

                    {items.length > 1 && (
                        <div className="px-4 sm:px-6 pt-3 flex flex-wrap items-center gap-2 text-xs">
                            <span className="text-gray-500">
                                Chọn sách đánh giá:
                            </span>
                            {items.map((item) => {
                                const active =
                                    String(item.product_id) ===
                                    String(selectedProductId);
                                return (
                                    <button
                                        key={item.product_id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedProductId(
                                                item.product_id,
                                            )
                                        }
                                        className={`px-3 py-1 rounded-full font-medium cursor-pointer ${
                                            active
                                                ? "bg-emerald-700 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {item.product_name}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="divide-y divide-gray-100 px-4 sm:px-6">
                        {items.map((item) => {
                            const subtotal =
                                Number(item.price || 0) *
                                Number(item.quantity || 1);
                            const isTarget =
                                String(item.product_id) ===
                                String(selectedProductId);

                            return (
                                <div
                                    key={item.product_id}
                                    onClick={() =>
                                        setSelectedProductId(item.product_id)
                                    }
                                    className={`py-4 flex items-start sm:items-center justify-between gap-3 sm:gap-6 cursor-pointer ${
                                        isTarget ? "" : "opacity-75"
                                    }`}
                                >
                                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                                        <div className="w-12 h-16 rounded bg-emerald-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-emerald-700 text-lg">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.product_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                "📖"
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                {item.product_name}
                                            </h3>
                                            {item.author && (
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {item.author}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-1">
                                                Số lượng: x{item.quantity}
                                            </p>
                                            <div className="sm:hidden mt-1 space-y-0.5 text-xs">
                                                <p className="text-gray-400">
                                                    Đơn giá:{" "}
                                                    {formatCurrency(item.price)}
                                                </p>
                                                <p className="font-semibold text-gray-800">
                                                    Thành tiền:{" "}
                                                    {formatCurrency(subtotal)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-12 shrink-0 text-right">
                                        <div className="w-28">
                                            <p className="text-[11px] text-gray-400">
                                                Đơn giá
                                            </p>
                                            <p className="text-sm font-medium text-gray-800 mt-0.5">
                                                {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                        <div className="w-28">
                                            <p className="text-[11px] text-gray-400">
                                                Thành tiền
                                            </p>
                                            <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                {formatCurrency(subtotal)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex items-baseline justify-end gap-2">
                        <span className="text-xs font-semibold text-gray-700">
                            Tổng tiền:
                        </span>
                        <span className="text-lg sm:text-xl font-bold text-emerald-700">
                            {formatCurrency(order.total_amount)}
                        </span>
                    </div>
                </div>
            )}

            {/* Khối Đánh giá sản phẩm: 2 cột trên desktop, xếp dọc trên mobile */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-xs">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                    Đánh giá sản phẩm
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Cột trái: Form chia sẻ cảm nhận */}
                    <form
                        onSubmit={handleSubmitReview}
                        className="md:col-span-6 space-y-4 md:border-r md:border-gray-100 md:pr-8"
                    >
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                            Chia sẻ cảm nhận của bạn
                        </p>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1.5">
                                Số sao
                            </label>
                            <div className="flex items-center gap-2.5">
                                <StarRow
                                    rating={star}
                                    interactive
                                    onSelect={(val) => setStar(val)}
                                />
                                <span className="text-xs text-gray-500">
                                    {star} sao
                                </span>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="review-comment"
                                className="block text-xs text-gray-500 mb-1.5"
                            >
                                Nhận xét của bạn
                            </label>
                            <textarea
                                id="review-comment"
                                rows={3}
                                maxLength={1000}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Viết cảm nhận về cuốn sách..."
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                            />
                        </div>

                        {feedback && (
                            <p
                                role="status"
                                className={`text-xs font-medium ${
                                    feedback.type === "success"
                                        ? "text-emerald-700"
                                        : "text-red-600"
                                }`}
                            >
                                {feedback.text}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                            {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                        </button>
                    </form>

                    {/* Cột phải: Danh sách đánh giá */}
                    <div className="md:col-span-6 space-y-4">
                        {loadingReviews ? (
                            <p className="text-xs text-gray-400">
                                Đang tải đánh giá...
                            </p>
                        ) : reviews.length === 0 ? (
                            <p className="text-xs sm:text-sm text-gray-400">
                                Chưa có đánh giá nào cho sản phẩm này.
                            </p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {reviews.map((rev, idx) => {
                                    const authorName =
                                        rev.user?.full_name ||
                                        rev.user?.name ||
                                        rev.author_name ||
                                        "Khách hàng";
                                    const starsCount = Number(
                                        rev.star ?? rev.rating ?? 5,
                                    );

                                    return (
                                        <div
                                            key={rev.rating_id ?? rev.id ?? idx}
                                            className={
                                                idx === 0 ? "pb-4" : "py-4"
                                            }
                                        >
                                            <p className="text-xs sm:text-sm font-semibold text-gray-800">
                                                {authorName}
                                            </p>
                                            <div className="my-1">
                                                <StarRow rating={starsCount} />
                                            </div>
                                            {rev.comment && (
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                    {rev.comment}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
