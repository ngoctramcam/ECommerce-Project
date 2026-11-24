import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const STATUS_BADGE = {
    pending: {
        label: "Chờ xác nhận",
        className: "bg-amber-50 text-amber-800 border border-amber-200/70",
    },
    shipping: {
        label: "Đang giao",
        className: "bg-blue-50 text-blue-700 border border-blue-200/70",
    },
    completed: {
        label: "Hoàn thành",
        className: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
    },
    cancelled: {
        label: "Đã hủy",
        className: "bg-red-50 text-red-600 border border-red-200/70",
    },
};

// Chuẩn hóa trạng thái từ DB (khớp cả tiếng Việt lẫn tiếng Anh)
const normalizeStatus = (rawStatus) => {
    const s = String(rawStatus || "").trim().toLowerCase();
    if (s === "pending" || s === "chờ xác nhận" || s === "chưa xác nhận") {
        return "pending";
    }
    if (s === "shipping" || s === "đang giao" || s === "đang giao hàng") {
        return "shipping";
    }
    if (s === "completed" || s === "hoàn thành" || s === "đã giao") {
        return "completed";
    }
    if (s === "cancelled" || s === "đã hủy" || s === "không nhận") {
        return "cancelled";
    }
    return "pending";
};

const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("vi-VN") + "đ";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy danh sách đơn hàng thật từ CSDL qua OrderController
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
                const userId = savedUser.user_id || savedUser.id || "";

                const res = await axios.get("/api/orders", {
                    params: userId ? { user_id: userId } : {},
                });

                setOrders(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Lỗi khi tải danh sách đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Cập nhật trạng thái đơn hàng: Hủy đơn / Đã nhận / Không nhận
    const handleUpdateStatus = async (orderId, newStatus, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;

        try {
            await axios.patch(`/api/orders/${orderId}/status`, {
                status: newStatus,
            });

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            alert("Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại!");
        }
    };

    const handleReviewOrder = (order) => {
        alert(`Mở khung đánh giá cho đơn hàng #${order.order_code}`);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center text-sm text-gray-500">
                Đang tải đơn hàng của bạn...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <Link to="/" className="hover:text-emerald-700 transition-colors">
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
                <span className="text-gray-600">Đơn hàng của tôi</span>
            </nav>

            {/* Tiêu đề trang */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                Đơn hàng của tôi
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl py-12 text-center">
                    <p className="text-sm text-gray-500 mb-3">
                        Bạn chưa có đơn hàng nào.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800"
                    >
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => {
                        const currentStatus = normalizeStatus(order.status);
                        const statusInfo =
                            STATUS_BADGE[currentStatus] || STATUS_BADGE.pending;

                        return (
                            <div
                                key={order.id}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs"
                            >
                                {/* 1. Header thẻ đơn hàng */}
                                <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-start sm:items-center justify-between gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-5">
                                        <span className="font-bold text-gray-900 text-sm sm:text-base">
                                            #{order.order_code}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Ngày đặt: {order.order_date}
                                        </span>
                                    </div>

                                    <span
                                        className={`px-3 py-1 rounded-md text-xs font-semibold shrink-0 ${statusInfo.className}`}
                                    >
                                        {statusInfo.label}
                                    </span>
                                </div>

                                {/* 2. Thông tin người nhận & thanh toán */}
                                <div className="px-4 sm:px-6 py-3 bg-gray-50/80 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-600">
                                    <div className="space-y-1">
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
                                                {order.payment_method}
                                            </strong>
                                        </span>
                                    </div>
                                </div>

                                {/* 3. Danh sách sản phẩm trong đơn */}
                                <div className="divide-y divide-gray-100 px-4 sm:px-6">
                                    {order.items.map((item) => {
                                        const subtotal =
                                            item.price * item.quantity;

                                        return (
                                            <div
                                                key={item.product_id}
                                                className="py-4 flex items-start sm:items-center justify-between gap-3 sm:gap-6"
                                            >
                                                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                                                    <div className="w-12 h-16 rounded bg-emerald-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-emerald-700 text-lg">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={
                                                                    item.product_name
                                                                }
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
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {item.author}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Số lượng: x
                                                            {item.quantity}
                                                        </p>

                                                        {/* Hiển thị giá trên Mobile */}
                                                        <div className="sm:hidden mt-1 space-y-0.5 text-xs">
                                                            <p className="text-gray-400">
                                                                Đơn giá:{" "}
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </p>
                                                            <p className="font-semibold text-gray-800">
                                                                Thành tiền:{" "}
                                                                {formatCurrency(
                                                                    subtotal
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Hiển thị Đơn giá & Thành tiền trên Desktop */}
                                                <div className="hidden sm:flex items-center gap-12 shrink-0 text-right">
                                                    <div className="w-28">
                                                        <p className="text-[11px] text-gray-400">
                                                            Đơn giá
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-800 mt-0.5">
                                                            {formatCurrency(
                                                                item.price
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div className="w-28">
                                                        <p className="text-[11px] text-gray-400">
                                                            Thành tiền
                                                        </p>
                                                        <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                            {formatCurrency(
                                                                subtotal
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* 4. Footer đơn hàng */}
                                <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col gap-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            {order.voucher_code && (
                                                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-md">
                                                    Mã giảm giá:{" "}
                                                    {order.voucher_code} (-
                                                    {formatCurrency(
                                                        order.discount_amount
                                                    )}
                                                    )
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline justify-end gap-2">
                                            <span className="text-xs font-semibold text-gray-700">
                                                Tổng tiền:
                                            </span>
                                            <span className="text-lg sm:text-xl font-bold text-emerald-700">
                                                {formatCurrency(
                                                    order.total_amount
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Nút "Hủy đơn hàng" khi trạng thái là Chờ xác nhận */}
                                    {currentStatus === "pending" && (
                                        <div className="flex justify-end pt-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Bạn có chắc chắn muốn hủy đơn hàng này không?"
                                                    )
                                                }
                                                className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-lg text-xs font-semibold bg-stone-200/80 text-amber-900 hover:bg-stone-300 transition-colors cursor-pointer"
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        </div>
                                    )}

                                    {/* Nút "Không nhận" & "Đã nhận" khi trạng thái là Đang giao */}
                                    {currentStatus === "shipping" && (
                                        <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2.5 pt-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Xác nhận từ chối / không nhận đơn hàng này?"
                                                    )
                                                }
                                                className="px-6 py-2 rounded-lg text-xs font-semibold border border-red-400 text-red-600 bg-white hover:bg-red-50 transition-colors cursor-pointer"
                                            >
                                                Không nhận
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "completed",
                                                        "Xác nhận bạn đã nhận được đầy đủ hàng?"
                                                    )
                                                }
                                                className="px-7 py-2 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                                            >
                                                Đã nhận
                                            </button>
                                        </div>
                                    )}

                                    {/* Nút "Đánh giá" khi trạng thái là Hoàn thành */}
                                    {currentStatus === "completed" && (
                                        <div className="flex justify-end pt-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReviewOrder(order)
                                                }
                                                className="w-full sm:w-auto px-8 py-2 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
                                            >
                                                Đánh giá
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}