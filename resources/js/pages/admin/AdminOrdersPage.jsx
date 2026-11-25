import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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

// Chuẩn hóa 5 trạng thái từ DB
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

const ITEMS_PER_PAGE = 5;

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    // Lấy toàn bộ danh sách đơn hàng cho Admin
    useEffect(() => {
        const fetchAllOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/admin/orders");
                const list = Array.isArray(res.data)
                    ? res.data
                    : Array.isArray(res.data?.data)
                    ? res.data.data
                    : [];
                setOrders(list);
            } catch (error) {
                console.error("Lỗi khi tải danh sách đơn hàng Admin:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
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

    // Lọc đơn hàng theo Tab trạng thái + Ô tìm kiếm (mã đơn hoặc SĐT khách hàng)
    const filteredOrders = useMemo(() => {
        const q = searchQuery.trim().toLowerCase().replace(/^#/, "");

        return orders.filter((order) => {
            const matchesTab =
                activeTab === "all" ||
                normalizeStatus(order.status) === activeTab;

            if (!matchesTab) return false;
            if (!q) return true;

            const code = String(order.order_code || order.id || "").toLowerCase();
            const phone = String(order.receiver_phone || "").toLowerCase();
            const name = String(order.receiver_name || "").toLowerCase();

            return (
                code.includes(q) || phone.includes(q) || name.includes(q)
            );
        });
    }, [orders, activeTab, searchQuery]);

    // Reset về trang 1 khi đổi tab hoặc từ khóa tìm kiếm
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    // Phân trang
    const totalPages = Math.max(
        1,
        Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
    );
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage]);

    // Cập nhật trạng thái đơn hàng từ phía Admin
    const handleUpdateStatus = async (orderId, newStatus, confirmMessage) => {
        if (!window.confirm(confirmMessage)) return;

        setUpdatingId(orderId);
        try {
            const statusValue = newStatus.toLowerCase();
            await axios.patch(`/api/admin/orders/${orderId}/status`, {
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

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center text-sm text-gray-500">
                Đang tải danh sách đơn hàng...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <Link to="/admin" className="hover:text-emerald-700 transition-colors">
                    Admin
                </Link>
                <span>/</span>
                <span className="text-gray-600">Quản lý đơn hàng</span>
            </nav>

            {/* Tiêu đề trang */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5">
                Quản lý đơn hàng
            </h1>

            {/* Thanh Tab lọc trạng thái + Ô tìm kiếm */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5 sm:mb-6">
                {/* Các nút Tab lọc */}
                <div className="flex flex-wrap items-center gap-2">
                    {FILTER_TABS.map((tab) => {
                        const isActive = activeTab === tab.key;
                        const count = statusCounts[tab.key] ?? 0;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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

                {/* Ô tìm kiếm mã đơn (#DH...) hoặc SĐT khách hàng */}
                <div className="relative w-full lg:w-72 shrink-0">
                    <svg
                        className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm theo mã đơn (#DH...) hoặc SĐT khách hàng..."
                        className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-700"
                    />
                </div>
            </div>

            {/* Danh sách đơn hàng */}
            {paginatedOrders.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl py-12 text-center">
                    <p className="text-sm text-gray-500">
                        Không tìm thấy đơn hàng nào phù hợp.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {paginatedOrders.map((order) => {
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
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Số lượng: x
                                                            {item.quantity}
                                                        </p>

                                                        {/* Mobile: Đơn giá & Thành tiền xếp dọc */}
                                                        <div className="sm:hidden mt-1 space-y-0.5 text-xs">
                                                            <p className="text-gray-400">
                                                                Đơn giá:{" "}
                                                                {formatCurrency(
                                                                    item.price
                                                                )}
                                                            </p>
                                                            <p className="font-bold text-gray-900">
                                                                Thành tiền:{" "}
                                                                {formatCurrency(
                                                                    subtotal
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Desktop: 2 cột Đơn giá & Thành tiền */}
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

                                {/* 4. Footer thẻ đơn hàng + Nút xử lý trạng thái Admin */}
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
                                            <span className="text-lg sm:text-xl font-bold text-emerald-800">
                                                {formatCurrency(
                                                    order.total_amount
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Nút thao tác Admin theo từng trạng thái */}
                                    {currentStatus === "pending" && (
                                        <div className="flex items-center justify-end gap-2.5 pt-0.5">
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Xác nhận hủy đơn hàng này?"
                                                    )
                                                }
                                                className="px-5 py-2 rounded-lg text-xs font-semibold bg-white border border-red-400 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Hủy đơn
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "processing",
                                                        "Xác nhận duyệt đơn hàng này sang Đang xử lý?"
                                                    )
                                                }
                                                className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Xác nhận đơn
                                            </button>
                                        </div>
                                    )}

                                    {currentStatus === "processing" && (
                                        <div className="flex items-center justify-end gap-2.5 pt-0.5">
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Xác nhận hủy đơn hàng này?"
                                                    )
                                                }
                                                className="px-5 py-2 rounded-lg text-xs font-semibold bg-white border border-red-400 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Hủy đơn
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "shipping",
                                                        "Chuyển đơn hàng sang trạng thái Đang giao?"
                                                    )
                                                }
                                                className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Giao cho vận chuyển
                                            </button>
                                        </div>
                                    )}

                                    {currentStatus === "shipping" && (
                                        <div className="flex items-center justify-end gap-2.5 pt-0.5">
                                            {/* Trên Mobile hiện thêm nút Hủy đơn cạnh Hoàn thành như ảnh */}
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "cancelled",
                                                        "Xác nhận hủy đơn hàng đang giao này?"
                                                    )
                                                }
                                                className="sm:hidden px-5 py-2 rounded-lg text-xs font-semibold bg-white border border-red-400 text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Hủy đơn
                                            </button>
                                            <button
                                                type="button"
                                                disabled={isBusy}
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        order.id,
                                                        "completed",
                                                        "Xác nhận đơn hàng đã giao hoàn thành?"
                                                    )
                                                }
                                                className="px-6 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-900 transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                Hoàn thành
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Thanh phân trang */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-7">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        className="px-3.5 py-2 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                    >
                        Trước
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                        (page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                    currentPage === page
                                        ? "bg-emerald-800 text-white"
                                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        className="px-3.5 py-2 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                    >
                        Sau
                    </button>
                </div>
            )}

            {/* ========================================================= */}
            {/* POPUP CHI TIẾT ĐƠN HÀNG ADMIN (DESKTOP & MOBILE)          */}
            {/* ========================================================= */}
            {selectedOrder &&
                (() => {
                    const modalStatus = normalizeStatus(selectedOrder.status);
                    const modalBadge =
                        STATUS_BADGE[modalStatus] || STATUS_BADGE.pending;
                    const modalItems = selectedOrder.items || [];
                    const subtotalAmount = modalItems.reduce(
                        (sum, it) =>
                            sum + Number(it.price) * Number(it.quantity),
                        0
                    );
                    const discountAmount = Number(
                        selectedOrder.discount_amount || 0
                    );
                    const shippingFee = Number(selectedOrder.shipping_fee || 0);
                    const isModalBusy = updatingId === selectedOrder.id;
                    const hasModalActions = [
                        "pending",
                        "processing",
                        "shipping",
                    ].includes(modalStatus);

                    return (
                        <div
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] p-3 sm:p-4"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white w-full sm:max-w-2xl h-[94vh] sm:h-auto sm:max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                            >
                                {/* 1. Header Popup */}
                                <div className="px-5 sm:px-6 pt-5 pb-3.5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                                    Chi tiết đơn hàng #
                                                    {selectedOrder.order_code}
                                                </h2>
                                                {/* Badge nằm cạnh tiêu đề trên Desktop */}
                                                <span
                                                    className={`hidden sm:inline-block px-3 py-1 rounded-md text-xs font-semibold ${modalBadge.className}`}
                                                >
                                                    {modalBadge.label}
                                                </span>
                                            </div>

                                            {/* Badge nằm dưới tiêu đề trên Mobile */}
                                            <div className="sm:hidden mt-1.5">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${modalBadge.className}`}
                                                >
                                                    {modalBadge.label}
                                                </span>
                                            </div>

                                            <p className="text-xs text-gray-400 mt-1.5">
                                                Đặt lúc:{" "}
                                                {selectedOrder.order_date}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedOrder(null)
                                            }
                                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer shrink-0"
                                            aria-label="Đóng"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* 2. Nội dung Popup */}
                                <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-5 flex-1">
                                    {/* Box Thông tin khách hàng & Thông tin giao hàng (Desktop 2 cột, Mobile xếp dọc) */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-1.5 text-xs">
                                            <p className="font-bold text-gray-900 text-sm">
                                                Thông tin khách hàng
                                            </p>
                                            <p className="text-gray-700">
                                                Người nhận:{" "}
                                                <span className="font-medium text-gray-900">
                                                    {
                                                        selectedOrder.receiver_name
                                                    }
                                                </span>
                                            </p>
                                            <p className="text-gray-700">
                                                SĐT:{" "}
                                                <span className="font-medium text-gray-900">
                                                    {
                                                        selectedOrder.receiver_phone
                                                    }
                                                </span>
                                            </p>
                                            {selectedOrder.email && (
                                                <p className="text-gray-700">
                                                    Email:{" "}
                                                    <span className="font-medium text-gray-900">
                                                        {selectedOrder.email}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200/80 space-y-1.5 text-xs">
                                            <p className="font-bold text-gray-900 text-sm">
                                                Thông tin giao hàng
                                            </p>
                                            <p className="text-gray-700">
                                                Địa chỉ:{" "}
                                                <span className="text-gray-900">
                                                    {
                                                        selectedOrder.shipping_address
                                                    }
                                                </span>
                                            </p>
                                            <div className="pt-1 text-gray-700">
                                                <p>Phương thức thanh toán:</p>
                                                <p className="font-medium text-gray-900 mt-0.5">
                                                    {selectedOrder.payment_method ===
                                                        "COD" ||
                                                    !selectedOrder.payment_method
                                                        ? "Thanh toán khi nhận hàng (COD)"
                                                        : selectedOrder.payment_method}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Danh sách sản phẩm */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-2.5">
                                            Danh sách sản phẩm (
                                            {modalItems.length})
                                        </h3>

                                        {/* Header bảng trên Desktop */}
                                        <div className="hidden sm:grid grid-cols-12 text-xs text-gray-400 pb-2 border-b border-gray-100">
                                            <span className="col-span-6">
                                                Sản phẩm
                                            </span>
                                            <span className="col-span-2 text-right">
                                                Đơn giá
                                            </span>
                                            <span className="col-span-2 text-center">
                                                SL
                                            </span>
                                            <span className="col-span-2 text-right">
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
                                                        className="py-3 flex sm:grid sm:grid-cols-12 items-start sm:items-center gap-3"
                                                    >
                                                        {/* Ảnh + Tên sách + Tác giả */}
                                                        <div className="sm:col-span-6 flex items-start sm:items-center gap-3 flex-1 min-w-0">
                                                            <div className="w-12 h-16 rounded bg-emerald-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center text-emerald-700">
                                                                {item.image ? (
                                                                    <img
                                                                        src={
                                                                            item.image
                                                                        }
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
                                                                <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                                                                    {
                                                                        item.product_name
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-0.5">
                                                                    {
                                                                        item.author
                                                                    }
                                                                </p>

                                                                {/* Mobile: Đơn giá + SL & Thành tiền */}
                                                                <p className="sm:hidden text-xs text-gray-400 mt-1">
                                                                    Đơn giá:{" "}
                                                                    {formatCurrency(
                                                                        item.price
                                                                    )}
                                                                </p>
                                                                <div className="sm:hidden flex items-center justify-between mt-1">
                                                                    <span className="text-xs text-gray-600">
                                                                        x
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                                                                        {formatCurrency(
                                                                            itemTotal
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Desktop: Đơn giá, SL, Thành tiền */}
                                                        <span className="hidden sm:block sm:col-span-2 text-right text-xs font-semibold text-gray-800">
                                                            {formatCurrency(
                                                                item.price
                                                            )}
                                                        </span>
                                                        <span className="hidden sm:block sm:col-span-2 text-center text-xs text-gray-700">
                                                            x{item.quantity}
                                                        </span>
                                                        <span className="hidden sm:block sm:col-span-2 text-right text-xs sm:text-sm font-bold text-gray-900">
                                                            {formatCurrency(
                                                                itemTotal
                                                            )}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Tổng kết tiền (Tạm tính, Phí vận chuyển, Mã giảm giá áp dụng, Tổng thanh toán) */}
                                    <div className="pt-2 border-t border-gray-100 flex flex-col items-end">
                                        <div className="w-full sm:w-80 space-y-2 text-xs">
                                            <div className="flex items-center justify-between text-gray-500">
                                                <span>Tạm tính</span>
                                                <span className="font-semibold text-gray-900">
                                                    {formatCurrency(
                                                        subtotalAmount
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-gray-500">
                                                <span>Phí vận chuyển</span>
                                                <span className="font-semibold text-gray-900">
                                                    {shippingFee === 0
                                                        ? "Miễn phí (0đ)"
                                                        : formatCurrency(
                                                              shippingFee
                                                          )}
                                                </span>
                                            </div>

                                            {discountAmount > 0 && (
                                                <div className="space-y-1.5">
                                                    <p className="text-gray-500">
                                                        Mã giảm giá áp dụng
                                                    </p>
                                                    <div className="flex justify-end">
                                                        <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
                                                            {selectedOrder.voucher_code ||
                                                                "GIAMGIA"}{" "}
                                                            (-
                                                            {formatCurrency(
                                                                discountAmount
                                                            )}
                                                            )
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-2.5 border-t border-gray-100 flex items-baseline justify-between">
                                                <span className="text-sm font-bold text-gray-900">
                                                    Tổng thanh toán
                                                </span>
                                                <span className="text-lg sm:text-xl font-extrabold text-emerald-800">
                                                    {formatCurrency(
                                                        selectedOrder.total_amount
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Footer Popup Admin */}
                                {hasModalActions && (
                                    <div className="px-5 sm:px-6 py-3.5 border-t border-gray-100 bg-white flex items-center justify-end gap-2.5">
                                        {modalStatus === "pending" && (
                                            <div className="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "cancelled",
                                                            "Xác nhận hủy đơn hàng này?"
                                                        )
                                                    }
                                                    className="px-5 py-2.5 rounded-lg bg-white border border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Hủy đơn
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "processing",
                                                            "Xác nhận duyệt đơn hàng này?"
                                                        )
                                                    }
                                                    className="px-6 py-2.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Xác nhận đơn
                                                </button>
                                            </div>
                                        )}

                                        {modalStatus === "processing" && (
                                            <div className="grid grid-cols-2 sm:flex gap-2.5 w-full sm:w-auto">
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "cancelled",
                                                            "Xác nhận hủy đơn hàng này?"
                                                        )
                                                    }
                                                    className="px-5 py-2.5 rounded-lg bg-white border border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Hủy đơn
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "shipping",
                                                            "Chuyển đơn hàng sang Đang giao?"
                                                        )
                                                    }
                                                    className="px-6 py-2.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Giao cho vận chuyển
                                                </button>
                                            </div>
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
                                                            "Xác nhận hủy đơn hàng đang giao này?"
                                                        )
                                                    }
                                                    className="px-5 py-2.5 rounded-lg bg-white border border-red-400 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Hủy đơn
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={isModalBusy}
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            selectedOrder.id,
                                                            "completed",
                                                            "Xác nhận đơn hàng đã giao hoàn thành?"
                                                        )
                                                    }
                                                    className="px-6 py-2.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                                                >
                                                    Xác nhận hoàn thành
                                                </button>
                                            </div>
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