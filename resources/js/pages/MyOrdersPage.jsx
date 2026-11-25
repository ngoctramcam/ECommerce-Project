import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const STATUS_BADGE = {
    pending: {
        label: "Chờ xác nhận",
        className: "bg-amber-50 text-amber-800 border border-amber-200/80",
    },
    processing: {
        label: "Đang xử lý",
        className: "bg-indigo-50 text-indigo-700 border border-indigo-200/80",
    },
    shipping: {
        label: "Đang giao",
        className: "bg-blue-50 text-blue-600 border border-blue-200/80",
    },
    completed: {
        label: "Hoàn thành",
        className: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    },
    cancelled: {
        label: "Đã hủy",
        className: "bg-red-50 text-red-600 border border-red-200/80",
    },
};

// Chuẩn hóa đủ 5 trạng thái từ DB (khớp cả tiếng Anh ENUM lẫn tiếng Việt)
const normalizeStatus = (rawStatus) => {
    const s = String(rawStatus || "").trim().toLowerCase();
    if (s === "pending" || s === "chờ xác nhận" || s === "chưa xác nhận") {
        return "pending";
    }
    if (
        s === "processing" ||
        s === "đang xử lý" ||
        s === "đã xác nhận" ||
        s === "confirmed"
    ) {
        return "processing";
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
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

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

                const list = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data?.data)
                    ? res.data.data
                    : [];
                setOrders(list);
            } catch (error) {
                console.error("Lỗi khi tải danh sách đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Khóa cuộn nền & đóng Popup khi bấm ESC
    useEffect(() => {
        if (!selectedOrder) return;
        document.body.style.overflow = "hidden";

        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedOrder(null);
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [selectedOrder]);

    // Cập nhật trạng thái đơn hàng: Hủy đơn / Đã nhận / Không nhận
    const handleUpdateStatus = async (orderId, newStatus, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;

        setUpdatingId(orderId);
        try {
            // Giữ nguyên chữ thường ('cancelled', 'completed') cho khớp Validation của Backend
            const statusValue = newStatus.toLowerCase();

            await axios.patch(`/api/orders/${orderId}/status`, {
                status: statusValue,
            });

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: statusValue } : order
                )
            );

            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder((prev) => ({ ...prev, status: statusValue }));
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại!"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const handleReviewOrder = (order) => {
        alert(`Mở khung đánh giá cho đơn hàng #${order.order_code}`);
    };

    // Tạo dữ liệu lịch sử trạng thái hiển thị trong Popup
    const buildStatusHistory = (order, currentStatus) => {
        const steps = [
            {
                active: currentStatus === "pending",
                time: order.order_date,
                title: "Chờ xác nhận",
                desc: "Đặt hàng thành công, chờ cửa hàng xác nhận.",
                actor: `Cập nhật: ${order.receiver_name || "Khách hàng"}`,
            },
        ];

        if (["processing", "shipping", "completed"].includes(currentStatus)) {
            steps.unshift({
                active: currentStatus === "processing",
                time: order.updated_date || order.order_date,
                title: "Đang xử lý",
                desc: "Cửa hàng đã xác nhận đơn và đang đóng gói sách.",
                actor: "Cập nhật: Quản trị viên",
            });
        }

        if (["shipping", "completed"].includes(currentStatus)) {
            steps.unshift({
                active: currentStatus === "shipping",
                time: order.shipping_date || order.updated_date || order.order_date,
                title: "Đang giao",
                desc: "Đã bàn giao cho đơn vị vận chuyển.",
                actor: "Cập nhật: Quản trị viên",
            });
        }

        if (currentStatus === "completed") {
            steps.unshift({
                active: true,
                time: order.completed_date || order.updated_date || order.order_date,
                title: "Hoàn thành",
                desc: "Giao hàng thành công.",
                actor: `Cập nhật: ${order.receiver_name || "Khách hàng"}`,
            });
        }

        if (currentStatus === "cancelled") {
            steps.unshift({
                active: true,
                time: order.cancelled_date || order.updated_date || order.order_date,
                title: "Đã hủy",
                desc: "Đơn hàng đã bị hủy.",
                actor: "Cập nhật: Hệ thống",
            });
        }

        return steps;
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
                        const isBusy = updatingId === order.id;

                        return (
                            <div
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
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
                                                {order.payment_method || "COD"}
                                            </strong>
                                        </span>
                                    </div>
                                </div>

                                {/* 3. Danh sách sản phẩm trong đơn */}
                                <div className="divide-y divide-gray-100 px-4 sm:px-6">
                                    {(order.items || []).map((item) => {
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
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col gap-3"
                                >
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

                                    {/* Hàng nút thao tác theo trạng thái */}
                                    <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            Xem chi tiết
                                        </button>

                                        {/* Nút "Hủy đơn hàng" khi trạng thái là Chờ xác nhận */}
                                        {currentStatus === "pending" && (
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Bạn có chắc chắn muốn hủy đơn hàng này không?"
                                                    )
                                                }
                                                className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-lg text-xs font-semibold bg-stone-200/80 text-amber-900 hover:bg-stone-300 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isBusy
                                                    ? "Đang xử lý..."
                                                    : "Hủy đơn hàng"}
                                            </button>
                                        )}

                                        {/* Nút "Không nhận" & "Đã nhận" khi trạng thái là Đang giao */}
                                        {currentStatus === "shipping" && (
                                            <div className="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            order.id,
                                                            "cancelled",
                                                            "Xác nhận từ chối / không nhận đơn hàng này?"
                                                        )
                                                    }
                                                    className="px-6 py-2 rounded-lg text-xs font-semibold border border-red-400 sm:border-transparent text-red-600 sm:text-white bg-white sm:bg-red-500 hover:bg-red-50 sm:hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Không nhận
                                                </button>

                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            order.id,
                                                            "completed",
                                                            "Xác nhận bạn đã nhận được đầy đủ hàng?"
                                                        )
                                                    }
                                                    className="px-7 py-2 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Đã nhận
                                                </button>
                                            </div>
                                        )}

                                        {/* Nút "Đánh giá" khi trạng thái là Hoàn thành */}
                                        {currentStatus === "completed" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReviewOrder(order)
                                                }
                                                className="w-full sm:w-auto px-8 py-2 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ========================================================= */}
            {/* POPUP CHI TIẾT ĐƠN HÀNG (RESPONSIVE DESKTOP & MOBILE)     */}
            {/* ========================================================= */}
            {selectedOrder &&
                (() => {
                    const modalStatus = normalizeStatus(selectedOrder.status);
                    const modalBadge =
                        STATUS_BADGE[modalStatus] || STATUS_BADGE.pending;
                    const modalItems = selectedOrder.items || [];
                    const subtotalAmount = modalItems.reduce(
                        (sum, it) => sum + Number(it.price) * Number(it.quantity),
                        0
                    );
                    const discountAmount = Number(
                        selectedOrder.discount_amount || 0
                    );
                    const timelineSteps = buildStatusHistory(
                        selectedOrder,
                        modalStatus
                    );
                    const isModalBusy = updatingId === selectedOrder.id;

                    return (
                        <div
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[1px] p-0 sm:p-4"
                        >
                            {/* Modal Container: Mobile bottom-sheet bo góc trên, Desktop căn giữa bo 4 góc */}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
                            >
                                {/* 1. Header Popup */}
                                <div className="px-5 sm:px-6 pt-5 pb-3.5 border-b border-gray-100 flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                            Chi tiết đơn hàng
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-1.5">
                                            <span className="text-xs sm:text-sm font-bold text-gray-800">
                                                #{selectedOrder.order_code}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Ngày đặt:{" "}
                                                {selectedOrder.order_date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 shrink-0">
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-semibold ${modalBadge.className}`}
                                        >
                                            {modalBadge.label}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedOrder(null)
                                            }
                                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                                            aria-label="Đóng"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* 2. Nội dung Popup (Cuộn mượt) */}
                                <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-5 flex-1">
                                    {/* Box Thông tin nhận hàng */}
                                    <div className="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1">
                                        <p className="text-xs font-bold text-gray-700">
                                            Thông tin nhận hàng
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                            {selectedOrder.receiver_name} ·{" "}
                                            {selectedOrder.receiver_phone}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {selectedOrder.shipping_address}
                                        </p>
                                    </div>

                                    {/* Danh sách sách đã đặt */}
                                    <div>
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-800 pb-2 border-b border-gray-100">
                                            <span>
                                                Sách đã đặt ({modalItems.length}
                                                )
                                            </span>
                                            <span className="text-gray-400 font-medium">
                                                Thành tiền
                                            </span>
                                        </div>

                                        <div className="divide-y divide-gray-100">
                                            {modalItems.map((item) => {
                                                const itemTotal =
                                                    Number(item.price) *
                                                    Number(item.quantity);
                                                return (
                                                    <div
                                                        key={item.product_id}
                                                        className="py-3 flex items-center justify-between gap-3"
                                                    >
                                                        <div className="min-w-0">
                                                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                                                                {
                                                                    item.product_name
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-0.5">
                                                                {item.author
                                                                    ? `${item.author} · `
                                                                    : ""}
                                                                {formatCurrency(
                                                                    item.price
                                                                )}{" "}
                                                                ×{" "}
                                                                {item.quantity}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
                                                            {formatCurrency(
                                                                itemTotal
                                                            )}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Tổng kết thanh toán */}
                                    <div className="space-y-2 pt-1">
                                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                                            <span>Tạm tính</span>
                                            <span className="font-semibold text-gray-900">
                                                {formatCurrency(subtotalAmount)}
                                            </span>
                                        </div>

                                        {discountAmount > 0 && (
                                            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                                                <span>
                                                    Giảm giá
                                                    {selectedOrder.voucher_code
                                                        ? ` · ${selectedOrder.voucher_code}`
                                                        : ""}
                                                </span>
                                                <span className="font-semibold text-emerald-700">
                                                    -
                                                    {formatCurrency(
                                                        discountAmount
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        <div className="mt-2 px-4 py-3 rounded-xl bg-emerald-50 flex items-center justify-between">
                                            <span className="text-xs sm:text-sm font-bold text-emerald-800">
                                                Tổng thanh toán (
                                                {selectedOrder.payment_method ||
                                                    "COD"}
                                                )
                                            </span>
                                            <span className="text-base sm:text-lg font-extrabold text-emerald-800">
                                                {formatCurrency(
                                                    selectedOrder.total_amount
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Lịch sử trạng thái đơn hàng */}
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3">
                                            Lịch sử trạng thái đơn hàng
                                        </h3>
                                        <div className="space-y-4">
                                            {timelineSteps.map((step, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start justify-between gap-2 text-xs"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <span
                                                            className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                                                                step.active
                                                                    ? "bg-emerald-700"
                                                                    : "bg-gray-300"
                                                            }`}
                                                        />
                                                        <div>
                                                            <p
                                                                className={`font-bold ${
                                                                    step.active
                                                                        ? "text-emerald-700"
                                                                        : "text-gray-800"
                                                                }`}
                                                            >
                                                                {step.title}
                                                            </p>
                                                            <p className="text-gray-500 mt-0.5">
                                                                {step.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right text-[11px] text-gray-400 shrink-0">
                                                        <p>{step.time}</p>
                                                        <p className="mt-0.5">
                                                            {step.actor}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Footer Popup */}
                                <div className="px-5 sm:px-6 py-3.5 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedOrder(null)}
                                        className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                                    >
                                        Đóng    
                                    </button>

                                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                                        {modalStatus === "pending" && (
                                            <button
                                                type="button"
                                                disabled={isModalBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        selectedOrder.id,
                                                        "cancelled",
                                                        "Bạn có chắc chắn muốn hủy đơn hàng này không?"
                                                    )
                                                }
                                                className="w-full sm:w-auto px-5 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        )}

                                        {modalStatus === "shipping" && (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "cancelled",
                                                            "Xác nhận từ chối / không nhận đơn hàng này?"
                                                        )
                                                    }
                                                    className="flex-1 sm:flex-initial px-5 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Không nhận hàng
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "completed",
                                                            "Xác nhận bạn đã nhận được đầy đủ hàng?"
                                                        )
                                                    }
                                                    className="flex-1 sm:flex-initial px-5 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Đã nhận hàng
                                                </button>
                                            </>
                                        )}

                                        {modalStatus === "completed" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReviewOrder(
                                                        selectedOrder
                                                    )
                                                }
                                                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
        </div>
    );
}