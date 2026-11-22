// [TV3] Trang Đặt hàng COD (/checkout) - đồng bộ luồng từ Giỏ hàng & chuẩn responsive 360px Ngày 9
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Nhận dữ liệu truyền từ trang Giỏ hàng (nếu có)
    const passedItems = location.state?.selectedItems || null;
    const passedCoupon = location.state?.couponCode || "";
    const passedDiscount = Number(location.state?.discount || 0);

    const [orderItems, setOrderItems] = useState(passedItems || []);
    const [loading, setLoading] = useState(!passedItems);
    const [submitting, setSubmitting] = useState(false);
    const [orderError, setOrderError] = useState("");

    const [formData, setFormData] = useState({
        receiver_name: "",
        receiver_phone: "",
        shipping_address: "",
        note: "",
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(Number(price || 0)) + "₫";
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setLoading(false);
            return;
        }

        const user = JSON.parse(storedUser);
        setFormData((prev) => ({
            ...prev,
            receiver_name: user.name || user.full_name || "",
            receiver_phone: user.phone || "",
            shipping_address: user.address || "",
        }));

        // Nếu mở trực tiếp /checkout (không đi qua nút ở Giỏ hàng) thì tự lấy giỏ hàng từ API TM-05
        if (!passedItems) {
            fetch(`/api/cart?user_id=${user.id}`, {
                headers: { Accept: "application/json" },
            })
                .then((res) => res.json())
                .then((data) => {
                    const items = data?.data || data?.items || data?.cart || [];
                    setOrderItems(Array.isArray(items) ? items : []);
                })
                .catch((err) => console.error("Lỗi tải giỏ hàng:", err))
                .finally(() => setLoading(false));
        }
    }, [passedItems]);

    const subtotal = orderItems.reduce((sum, item) => {
        const price = Number(item.price ?? item.product?.price ?? 0);
        const qty = Number(item.qty ?? item.quantity ?? 1);
        return sum + price * qty;
    }, 0);

    const shippingFee = 0;
    const totalAmount = Math.max(0, subtotal + shippingFee - passedDiscount);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gọi API đặt hàng COD (TM-06)
    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setOrderError("");

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            return;
        }

        if (orderItems.length === 0) {
            setOrderError("Không có sản phẩm nào để đặt hàng.");
            return;
        }

        if (
            !formData.receiver_name.trim() ||
            !formData.receiver_phone.trim() ||
            !formData.shipping_address.trim()
        ) {
            setOrderError(
                "Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng.",
            );
            return;
        }

        const user = JSON.parse(storedUser);
        setSubmitting(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({
                    user_id: user.id,
                    receiver_name: formData.receiver_name.trim(),
                    receiver_phone: formData.receiver_phone.trim(),
                    shipping_address: formData.shipping_address.trim(),
                    note: formData.note.trim(),
                    payment_method: "COD",
                    coupon_code: passedCoupon || null,
                    discount_amount: passedDiscount,
                    total_amount: totalAmount,
                }),
            });

            const data = await res.json();

            if (!res.ok || data.success === false) {
                setOrderError(
                    data.message || "Đặt hàng thất bại, vui lòng thử lại.",
                );
                return;
            }

            window.dispatchEvent(new Event("cartUpdated"));
            alert("Đặt hàng thành công! Cảm ơn bạn đã mua sách tại Mộc Sách.");
            navigate("/");
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            setOrderError("Có lỗi xảy ra khi kết nối máy chủ.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
                Đang tải thông tin đặt hàng...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 space-y-5 pb-24 md:pb-12">
            {/* Breadcrumb giống trang Giỏ hàng */}
            <nav className="text-xs text-gray-500 flex flex-wrap items-center gap-1.5">
                <Link to="/" className="hover:text-emerald-700">
                    Trang chủ
                </Link>
                <span>/</span>
                <Link to="/cart" className="hover:text-emerald-700">
                    Giỏ hàng
                </Link>
                <span>/</span>
                <span className="text-gray-700 font-medium">Đặt hàng</span>
            </nav>

            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                Đặt hàng
            </h1>

            <form
                onSubmit={handleSubmitOrder}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start"
            >
                {/* Cột trái: Thông tin giao hàng & Thanh toán COD */}
                {/* [NGÀY 9 - Responsive 360px]: Thêm min-w-0 để các ô input không đẩy phình khung form trên 360px */}
                <div className="lg:col-span-7 min-w-0 space-y-5">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">
                            Thông tin giao hàng
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                    Họ và tên người nhận{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="receiver_name"
                                    value={formData.receiver_name}
                                    onChange={handleInputChange}
                                    placeholder="Nhập họ tên người nhận"
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                    Số điện thoại{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="receiver_phone"
                                    value={formData.receiver_phone}
                                    onChange={handleInputChange}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                Địa chỉ giao hàng{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="shipping_address"
                                value={formData.shipping_address}
                                onChange={handleInputChange}
                                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                Ghi chú đơn hàng (tùy chọn)
                            </label>
                            <textarea
                                name="note"
                                rows="2"
                                value={formData.note}
                                onChange={handleInputChange}
                                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-3">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900">
                            Phương thức thanh toán
                        </h2>
                        <label className="flex items-start gap-3 p-3.5 rounded-lg border border-emerald-700 bg-emerald-50/40 cursor-pointer">
                            <input
                                type="radio"
                                name="payment_method"
                                checked
                                readOnly
                                className="mt-1 accent-emerald-700"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Thanh toán khi nhận hàng (COD)
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                    Thanh toán bằng tiền mặt cho nhân viên giao
                                    hàng khi nhận sách.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Cột phải: Tóm tắt đơn hàng giống hệt style card bên phải trang Giỏ hàng */}
                {/* [NGÀY 9 - Responsive 360px]: Thêm min-w-0 để khung tóm tắt đơn hàng không tràn ngang */}
                <div className="lg:col-span-5 min-w-0 bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Tóm tắt đơn hàng ({orderItems.length} sản phẩm)
                    </h2>

                    {orderItems.length === 0 ? (
                        <div className="py-6 text-center text-xs sm:text-sm text-gray-500 border-y border-gray-100">
                            Chưa có sản phẩm nào được chọn.{" "}
                            <Link
                                to="/cart"
                                className="text-emerald-700 font-medium hover:underline"
                            >
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
                            {orderItems.map((item, idx) => {
                                const name =
                                    item.product_name ||
                                    item.product?.product_name ||
                                    "Sách";
                                const price = Number(
                                    item.price ?? item.product?.price ?? 0,
                                );
                                const qty = Number(
                                    item.qty ?? item.quantity ?? 1,
                                );
                                const img =
                                    item.image || item.product?.image || "";

                                return (
                                    <div
                                        key={item.id ?? item.product_id ?? idx}
                                        className="py-3 flex items-center gap-3"
                                    >
                                        <div className="w-11 h-15 bg-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center">
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-base">
                                                    📘
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                                                {name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                SL: {qty}
                                            </p>
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900 shrink-0">
                                            {formatPrice(price * qty)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Chi tiết tính tiền */}
                    <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs sm:text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Tạm tính</span>
                            <span className="font-medium text-gray-900">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        {passedDiscount > 0 && (
                            <div className="flex justify-between text-emerald-700">
                                <span>
                                    Giảm giá{" "}
                                    {passedCoupon ? `(${passedCoupon})` : ""}
                                </span>
                                <span className="font-medium">
                                    -{formatPrice(passedDiscount)}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between text-gray-600">
                            <span>Phí vận chuyển</span>
                            <span className="text-emerald-700 font-medium">
                                Miễn phí
                            </span>
                        </div>

                        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-base font-bold text-gray-900">
                                Tổng cộng
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-emerald-700">
                                {formatPrice(totalAmount)}
                            </span>
                        </div>
                    </div>

                    {orderError && (
                        <p className="text-xs sm:text-sm text-red-600 font-medium">
                            {orderError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting || orderItems.length === 0}
                        className="w-full py-3 px-5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {submitting
                            ? "Đang xử lý đơn hàng..."
                            : "Xác nhận đặt hàng"}
                    </button>
                </div>
            </form>
        </div>
    );
}
