import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const STATUS_BADGE = {
    pending: {
        label: "Chờ xác nhận",
        className: "bg-amber-50 text-amber-800 border border-amber-200/80",
    },
    processing: {
        label: "Đang xử lý",
        className: "bg-pink-100 text-pink-800 border border-pink-200/80",
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

const FILTER_TABS = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "processing", label: "Đang xử lý" },
    { key: "shipping", label: "Đang giao" },
    { key: "completed", label: "Hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
];

// Chuẩn hóa đủ 5 trạng thái từ DB
const normalizeStatus = (rawStatus) => {
    const s = String(rawStatus || "")
        .trim()
        .toLowerCase();
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
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    // Lấy danh sách đơn hàng từ API Laravel
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const savedUser = JSON.parse(
                    localStorage.getItem("user") || "{}"
                );
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

    // Khóa cuộn trang nền & lắng nghe ESC khi mở Popup
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

    // Đếm số lượng đơn cho từng Tab lọc
    const statusCounts = useMemo(() => {
        const counts = {
            all: orders.length,
            pending: 0,
            processing: 0,
            shipping: 0,
            completed: 0,
            cancelled: 0,
        };
        orders.forEach((o) => {
            const st = normalizeStatus(o.status);
            if (counts[st] !== undefined) counts[st] += 1;
        });
        return counts;
    }, [orders]);

    // Lọc danh sách đơn theo Tab đang chọn
    const filteredOrders = useMemo(() => {
        if (activeTab === "all") return orders;
        return orders.filter((o) => normalizeStatus(o.status) === activeTab);
    }, [orders, activeTab]);

    // Cập nhật trạng thái đơn hàng (giữ chữ thường khớp Validation Laravel)
    const handleUpdateStatus = async (orderId, newStatus, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;

        setUpdatingId(orderId);
        try {
            const statusValue = newStatus.toLowerCase();

            await axios.patch(`/api/orders/${orderId}/status`, {
                status: statusValue,
            });

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId
                        ? { ...order, status: statusValue }
                        : order
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
        navigate(`/orders/${order.id ?? order.order_id}/review`, {
            state: { order },
        });
    };

    // Tạo dữ liệu timeline lịch sử trạng thái
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
                desc: "Cửa hàng đã xác nhận và đang đóng gói sách.",
                actor: "Cập nhật: Quản trị viên",
            });
        }

        if (["shipping", "completed"].includes(currentStatus)) {
            steps.unshift({
                active: currentStatus === "shipping",
                time:
                    order.shipping_date ||
                    order.updated_date ||
                    order.order_date,
                title: "Đang giao",
                desc: "Đã bàn giao cho đơn vị vận chuyển.",
                actor: "Cập nhật: Quản trị viên",
            });
        }

        if (currentStatus === "completed") {
            steps.unshift({
                active: true,
                time:
                    order.completed_date ||
                    order.updated_date ||
                    order.order_date,
                title: "Hoàn thành",
                desc: "Giao hàng thành công.",
                actor: `Cập nhật: ${order.receiver_name || "Khách hàng"}`,
            });
        }

        if (currentStatus === "cancelled") {
            steps.unshift({
                active: true,
                time:
                    order.cancelled_date ||
                    order.updated_date ||
                    order.order_date,
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
                <span className="text-gray-600">Đơn hàng của tôi</span>
            </nav>

            {/* Tiêu đề trang */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">
                Đơn hàng của tôi
            </h1>

            {/* Thanh Tab lọc trạng thái (Responsive: Mobile wrap gọn, Desktop 1 hàng) */}
            <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
                {FILTER_TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    const count = statusCounts[tab.key] ?? 0;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-3.5 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                isActive
                                    ? "bg-emerald-800 text-white shadow-xs"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-600 hover:text-emerald-800"
                            }`}
                        >
                            {tab.label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Danh sách đơn hàng */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl py-12 text-center">
                    <p className="text-sm text-gray-500 mb-3">
                        {orders.length === 0
                            ? "Bạn chưa có đơn hàng nào."
                            : "Không có đơn hàng nào ở trạng thái này."}
                    </p>
                    {orders.length === 0 && (
                        <Link
                            to="/"
                            className="inline-block px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-900"
                        >
                            Tiếp tục mua sắm
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-5">
                    {filteredOrders.map((order) => {
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
                                        className={`px-3.5 py-1 rounded-md text-xs font-semibold shrink-0 ${statusInfo.className}`}
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
                                                className="py-4 flex items-start sm:items-center justify-between gap-3.5 sm:gap-6"
                                            >
                                                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                                                    <div className="w-14 h-20 sm:w-12 sm:h-16 rounded bg-emerald-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-emerald-700 text-lg">
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
                                                        <h3 className="font-bold sm:font-semibold text-gray-900 text-sm truncate">
                                                            {item.product_name}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {item.author}
                                                        </p>

                                                        {/* Mobile: Đơn giá nằm trên, Số lượng (trái) & Thành tiền (phải) ở hàng dưới */}
                                                        <p className="sm:hidden text-xs text-gray-400 mt-1">
                                                            Đơn giá:{" "}
                                                            {formatCurrency(
                                                                item.price
                                                            )}
                                                        </p>
                                                        <div className="sm:hidden flex items-center justify-between mt-1">
                                                            <span className="text-xs text-gray-500">
                                                                Số lượng: x
                                                                {item.quantity}
                                                            </span>
                                                            <span className="text-sm font-bold text-gray-900">
                                                                {formatCurrency(
                                                                    subtotal
                                                                )}
                                                            </span>
                                                        </div>

                                                        {/* Desktop: Chỉ hiện Số lượng dưới tác giả */}
                                                        <p className="hidden sm:block text-xs text-gray-500 mt-1">
                                                            Số lượng: x
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Desktop: 2 cột Đơn giá & Thành tiền bên phải */}
                                                <div className="hidden sm:flex items-center gap-12 shrink-0 text-right">
                                                    <div className="w-28">
                                                        <p className="text-[11px] text-gray-400">
                                                            Đơn giá
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-800 mt-0.5">
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

                                        {/* Mobile: Tổng tiền trái, số tiền phải | Desktop: căn phải */}
                                        <div className="flex items-baseline justify-between sm:justify-end gap-2">
                                            <span className="text-xs font-semibold text-gray-700">
                                                Tổng tiền:
                                            </span>
                                            <span className="text-lg sm:text-xl font-bold text-emerald-800">
                                                {formatCurrency(
                                                    order.total_amount
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Nút "Hủy đơn" màu đỏ khi Chờ xác nhận hoặc Đang xử lý */}
                                    {(currentStatus === "pending" ||
                                        currentStatus === "processing") && (
                                        <div className="flex justify-end pt-0.5">
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
                                                className="px-6 py-2 rounded-lg text-xs font-semibold bg-white border border-red-400 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isBusy
                                                    ? "Đang xử lý..."
                                                    : "Hủy đơn"}
                                            </button>
                                        </div>
                                    )}

                                    {/* Cặp nút "Không nhận" & "Đã nhận" khi Đang giao */}
                                    {currentStatus === "shipping" && (
                                        <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2.5 pt-0.5">
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
                                                className="px-6 py-2 rounded-lg text-xs font-semibold border border-red-400 text-red-600 bg-white hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
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
                                                className="px-8 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Đã nhận
                                            </button>
                                        </div>
                                    )}

                                    {/* Nút "Đánh giá" khi Hoàn thành */}
                                    {currentStatus === "completed" && (
                                        <div className="flex justify-end pt-0.5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReviewOrder(order)
                                                }
                                                className="px-8 py-2 rounded-lg text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors cursor-pointer"
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
                    const hasModalActions =
                        modalStatus === "pending" ||
                        modalStatus === "processing" ||
                        modalStatus === "shipping" ||
                        modalStatus === "completed";

                    return (
                        <div
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-3 sm:p-4"
                        >
                            {/* Modal Container */}
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-full sm:max-w-xl h-[94vh] sm:h-auto sm:max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                            >
                                {/* 1. Header Popup */}
                                <div className="px-5 sm:px-6 pt-5 pb-3.5 border-b border-gray-100">
                                    {/* Dòng 1: Tiêu đề + Nút đóng X */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                            Chi tiết đơn hàng
                                        </h2>
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

                                    {/* Dòng 2: Mã đơn + Ngày đặt + Badge trạng thái */}
                                    <div className="flex items-start sm:items-center justify-between gap-2 mt-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4">
                                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                                                #{selectedOrder.order_code}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                Ngày đặt:{" "}
                                                {selectedOrder.order_date}
                                            </span>
                                        </div>

                                        <span
                                            className={`px-3.5 py-1 rounded-md text-xs font-semibold shrink-0 ${modalBadge.className}`}
                                        >
                                            {modalBadge.label}
                                        </span>
                                    </div>
                                </div>

                                {/* 2. Nội dung Popup */}
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

                                    {/* Sách đã đặt */}
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

                                    {/* Tổng kết tiền */}
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

                                    {/* Lịch sử trạng thái đơn hàng (Desktop 3 cột | Mobile timeline dọc có đường nối) */}
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-3">
                                            Lịch sử trạng thái đơn hàng
                                        </h3>

                                        <div className="space-y-4">
                                            {timelineSteps.map((step, idx) => {
                                                const isLast =
                                                    idx ===
                                                    timelineSteps.length - 1;

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="relative flex items-start justify-between gap-3 text-xs"
                                                    >
                                                        {/* Đường nối dọc trên Mobile */}
                                                        {!isLast && (
                                                            <span
                                                                className="sm:hidden absolute left-[4px] top-3.5 bottom-[-16px] w-[1.5px] bg-gray-200"
                                                                aria-hidden="true"
                                                            />
                                                        )}

                                                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                                            <span
                                                                className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 z-10 ${
                                                                    step.active
                                                                        ? "bg-emerald-700"
                                                                        : "bg-gray-300"
                                                                }`}
                                                            />

                                                            {/* Thời gian hiển thị bên cạnh chấm tròn trên Desktop */}
                                                            <span className="hidden sm:inline-block w-28 text-[11px] text-gray-400 shrink-0 pt-0.5">
                                                                {step.time}
                                                            </span>

                                                            {/* Nội dung trạng thái */}
                                                            <div className="space-y-0.5">
                                                                {/* Thời gian nằm trên tiêu đề ở Mobile */}
                                                                <p className="sm:hidden text-[11px] text-gray-400">
                                                                    {step.time}
                                                                </p>
                                                                <p
                                                                    className={`font-bold ${
                                                                        step.active
                                                                            ? "text-emerald-700"
                                                                            : "text-gray-800"
                                                                    }`}
                                                                >
                                                                    {step.title}
                                                                </p>
                                                                <p className="text-gray-500">
                                                                    {step.desc}
                                                                </p>
                                                                {/* Người cập nhật nằm dưới mô tả ở Mobile */}
                                                                <p className="sm:hidden text-[11px] text-gray-400 pt-0.5">
                                                                    {step.actor}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Người cập nhật căn phải trên Desktop */}
                                                        <span className="hidden sm:inline-block text-[11px] text-gray-400 text-right shrink-0 pt-0.5">
                                                            {step.actor}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Footer Popup (Chỉ hiện khi có nút hành động tương ứng) */}
                                {hasModalActions && (
                                    <div className="px-5 sm:px-6 py-3.5 border-t border-gray-100 bg-white flex items-center justify-end gap-2.5">
                                        {(modalStatus === "pending" ||
                                            modalStatus === "processing") && (
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
                                                className="w-full sm:w-auto px-6 py-2 rounded-lg bg-white border border-red-400 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                {isModalBusy
                                                    ? "Đang xử lý..."
                                                    : "Hủy đơn"}
                                            </button>
                                        )}

                                        {modalStatus === "shipping" && (
                                            <div className="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
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
                                                    className="px-5 py-2 rounded-lg border border-red-400 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
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
                                                    className="px-6 py-2 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Đã nhận hàng
                                                </button>
                                            </div>
                                        )}

                                        {modalStatus === "completed" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReviewOrder(
                                                        selectedOrder
                                                    )
                                                }
                                                className="w-full sm:w-auto px-7 py-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}
        </div>
    );
}