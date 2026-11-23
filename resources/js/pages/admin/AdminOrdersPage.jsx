import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
// AI-assisted [AI-07]

// Cấu hình màu sắc & nhãn badge đúng 100% theo thiết kế
const STATUS_CONFIG = {
    pending: {
        label: "Chờ xác nhận",
        className: "bg-[#fef9e7] text-[#b7791f]",
    },
    processing: {
        label: "Đang xử lý",
        className: "bg-[#eff6ff] text-[#2563eb]",
    },
    shipping: {
        label: "Đang giao",
        className: "bg-[#eff6ff] text-[#2563eb]",
    },
    completed: {
        label: "Hoàn thành",
        className: "bg-[#ecfdf5] text-[#059669]",
    },
    cancelled: {
        label: "Đã hủy",
        className: "bg-[#fef2f2] text-[#dc2626]",
    },
};

// Chuẩn hóa trạng thái từ DB (khớp cả tiếng Việt lẫn tiếng Anh)
const normalizeStatus = (raw) => {
    const s = String(raw || "").trim().toLowerCase();
    if (s === "pending" || s === "chờ xác nhận" || s === "chưa xác nhận") return "pending";
    if (s === "processing" || s === "đang xử lý") return "processing";
    if (s === "shipping" || s === "đang giao" || s === "đang giao hàng") return "shipping";
    if (s === "completed" || s === "hoàn thành" || s === "đã giao") return "completed";
    if (s === "cancelled" || s === "đã hủy" || s === "không nhận") return "cancelled";
    return "pending";
};

const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("vi-VN") + "đ";

const formatPaymentMethod = (method) => {
    const m = String(method || "").trim().toUpperCase();
    if (!m || m === "COD") return "Thanh toán khi nhận hàng";
    if (m === "BANK" || m === "BANKING" || m === "CHUYỂN KHOẢN") return "Chuyển khoản";
    return method;
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Bộ lọc tìm kiếm, trạng thái và phương thức thanh toán
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    // Phân trang (6 đơn / trang như trong ảnh)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    // Gọi API lấy danh sách đơn hàng từ Laravel
    const fetchOrders = async (status) => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/orders", {
                params: status !== "all" ? { status } : {},
            });
            setOrders(Array.isArray(res.data) ? res.data : []);
            setCurrentPage(1);
        } catch (error) {
            console.error("Lỗi khi tải danh sách đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(statusFilter);
    }, [statusFilter]);

    // Lọc tìm kiếm (Mã đơn, người nhận, SĐT) + Phương thức thanh toán
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const q = searchQuery.trim().toLowerCase();
            const matchKeyword =
                !q ||
                String(order.order_code || "").toLowerCase().includes(q) ||
                String(order.receiver_name || "").toLowerCase().includes(q) ||
                String(order.receiver_phone || "").toLowerCase().includes(q);

            const payText = formatPaymentMethod(order.payment_method).toLowerCase();
            const matchPayment =
                paymentFilter === "all" ||
                (paymentFilter === "cod" && payText.includes("nhận hàng")) ||
                (paymentFilter === "bank" && payText.includes("chuyển khoản"));

            return matchKeyword && matchPayment;
        });
    }, [orders, searchQuery, paymentFilter]);

    // Tính phân trang
    const totalItems = filteredOrders.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const startIdx = (safePage - 1) * pageSize;
    const currentOrders = filteredOrders.slice(startIdx, startIdx + pageSize);

    // Cập nhật trạng thái một chiều
    const handleTransitionStatus = async (orderId, nextStatus, confirmMsg) => {
        if (!window.confirm(confirmMsg)) return;

        try {
            await axios.patch(`/api/admin/orders/${orderId}/status`, {
                status: nextStatus,
            });
            fetchOrders(statusFilter);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Không thể chuyển trạng thái đơn hàng!"
            );
        }
    };

    // Cụm Badge + Nút chuyển trạng thái 1 chiều
    const renderStatusColumn = (order) => {
        const statusKey = normalizeStatus(order.status);
        const badge = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;

        return (
            <div className="flex flex-col items-end md:items-center gap-2">
                {/* Pill Badge trạng thái */}
                <span
                    className={`inline-flex items-center justify-center min-w-[124px] px-4 py-1.5 rounded-full text-xs font-medium ${badge.className}`}
                >
                    {badge.label}
                </span>

                {/* Nút "Xác nhận" dưới "Chờ xác nhận" (chuyển sang Đang giao) + nút Hủy nhỏ */}
                {statusKey === "pending" && (
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() =>
                                handleTransitionStatus(
                                    order.id,
                                    "shipping",
                                    `Xác nhận đơn hàng ${order.order_code} và chuyển sang Đang giao?`
                                )
                            }
                            className="min-w-[124px] px-4 py-1.5 rounded-full text-xs font-medium bg-[#065f46] text-white hover:bg-[#064e3b] transition-colors cursor-pointer"
                        >
                            Xác nhận
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleTransitionStatus(
                                    order.id,
                                    "cancelled",
                                    `Hủy đơn hàng ${order.order_code}? Số lượng tồn kho sẽ được hoàn lại.`
                                )
                            }
                            className="px-2.5 py-1.5 rounded-full text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                            title="Hủy đơn hàng"
                        >
                            Hủy
                        </button>
                    </div>
                )}

                {/* Khi Đang xử lý / Đang giao -> Hoàn thành hoặc Hủy */}
                {(statusKey === "processing" || statusKey === "shipping") && (
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() =>
                                handleTransitionStatus(
                                    order.id,
                                    "completed",
                                    `Xác nhận đơn ${order.order_code} đã giao Hoàn thành?`
                                )
                            }
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#065f46] text-white hover:bg-[#064e3b] transition-colors cursor-pointer"
                        >
                            Hoàn thành
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                handleTransitionStatus(
                                    order.id,
                                    "cancelled",
                                    `Hủy đơn hàng ${order.order_code}?`
                                )
                            }
                            className="px-2.5 py-1.5 rounded-full text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            Hủy
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Thanh nút phân trang dùng chung cho cả Desktop và Mobile
    const renderPaginationButtons = () => (
        <div className="flex items-center gap-1.5">
            <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
                Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        safePage === page
                            ? "bg-[#065f46] text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
                Sau
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-12">
            {/* Topbar trên Desktop */}
            <header className="hidden md:flex items-center justify-between bg-white border-b border-gray-200/80 px-8 py-4">
                <span className="text-base font-bold text-gray-900">
                    Quản lý Đơn hàng
                </span>

                <div className="flex items-center gap-3 text-right">
                    <div>
                        <p className="text-xs font-semibold text-gray-900">
                            Lê Minh Anh
                        </p>
                        <p className="text-[11px] text-gray-400">
                            Quản trị viên
                        </p>
                    </div>
                    <span className="text-gray-400 text-sm">›</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
                {/* Tiêu đề & mô tả */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight">
                        Quản lý Đơn hàng
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Theo dõi đơn hàng, thông tin nhận hàng và trạng thái xử lý.
                    </p>
                </div>

                {/* Khu vực Tìm kiếm & Bộ lọc */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6">
                    {/* Input tìm kiếm */}
                    <div className="relative flex-1 md:max-w-[400px]">
                        <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Tìm mã đơn, người nhận, số điện thoại..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#065f46]"
                        />
                    </div>

                    {/* Dropdown lọc trạng thái */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#065f46] md:min-w-[215px] cursor-pointer"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="shipping">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>

                    {/* Dropdown lọc phương thức thanh toán (Mobile giống ảnh 2) */}
                    <select
                        value={paymentFilter}
                        onChange={(e) => {
                            setPaymentFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="md:hidden px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 focus:outline-none focus:border-[#065f46] cursor-pointer"
                    >
                        <option value="all">Tất cả phương thức thanh toán</option>
                        <option value="cod">Thanh toán khi nhận hàng</option>
                        <option value="bank">Chuyển khoản</option>
                    </select>
                </div>

                {loading ? (
                    <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center text-sm text-gray-500">
                        Đang tải danh sách đơn hàng...
                    </div>
                ) : currentOrders.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center text-sm text-gray-500">
                        Không có đơn hàng nào phù hợp.
                    </div>
                ) : (
                    <>
                        {/* ================================================= */}
                        {/* 1. GIAO DIỆN DESKTOP (Bảng 7 cột theo ảnh 1)      */}
                        {/* ================================================= */}
                        <div className="hidden md:block bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-2xs">
                            <div className="px-6 py-5">
                                <h2 className="text-base font-bold text-gray-900">
                                    Danh sách Đơn hàng
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#f8fafc] border-y border-gray-100 text-xs font-medium text-gray-500">
                                            <th className="py-3.5 px-6">
                                                Mã đơn / Người dùng
                                            </th>
                                            <th className="py-3.5 px-4">
                                                Người nhận
                                            </th>
                                            <th className="py-3.5 px-4">
                                                Địa chỉ nhận hàng
                                            </th>
                                            <th className="py-3.5 px-4">
                                                Ngày đặt
                                            </th>
                                            <th className="py-3.5 px-4">
                                                Tổng tiền / Mã giảm
                                            </th>
                                            <th className="py-3.5 px-4">
                                                Thanh toán
                                            </th>
                                            <th className="py-3.5 px-6 text-center">
                                                Trạng thái
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 text-xs">
                                        {currentOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-gray-50/60 transition-colors"
                                            >
                                                {/* Mã đơn / Người dùng */}
                                                <td className="py-5 px-6 align-top">
                                                    <p className="font-bold text-[#065f46] text-[13px]">
                                                        {order.order_code}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1">
                                                        {order.user_code || "ND002"}
                                                    </p>
                                                </td>

                                                {/* Người nhận */}
                                                <td className="py-5 px-4 align-top">
                                                    <p className="font-semibold text-gray-900 text-[13px]">
                                                        {order.receiver_name}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1">
                                                        {order.receiver_phone}
                                                    </p>
                                                </td>

                                                {/* Địa chỉ nhận hàng */}
                                                <td className="py-5 px-4 align-top max-w-[230px] text-gray-700 leading-relaxed">
                                                    {order.shipping_address}
                                                </td>

                                                {/* Ngày đặt */}
                                                <td className="py-5 px-4 align-top">
                                                    <p className="text-gray-800 font-medium">
                                                        {order.order_date}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1">
                                                        {order.order_time || "09:42"}
                                                    </p>
                                                </td>

                                                {/* Tổng tiền / Mã giảm */}
                                                <td className="py-5 px-4 align-top">
                                                    <p className="font-bold text-gray-900 text-[13px]">
                                                        {formatCurrency(
                                                            order.total_amount
                                                        )}
                                                    </p>
                                                    <p className="text-[11px] text-gray-400 mt-1">
                                                        {order.voucher_code ||
                                                            "Không áp dụng"}
                                                    </p>
                                                </td>

                                                {/* Thanh toán */}
                                                <td className="py-5 px-4 align-top max-w-[140px] text-gray-700 leading-relaxed">
                                                    {formatPaymentMethod(
                                                        order.payment_method
                                                    )}
                                                </td>

                                                {/* Trạng thái */}
                                                <td className="py-5 px-6 align-top text-center">
                                                    {renderStatusColumn(order)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer phân trang Desktop */}
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                <span>
                                    Hiển thị {startIdx + 1}–
                                    {Math.min(startIdx + pageSize, totalItems)}{" "}
                                    trên {totalItems} đơn hàng
                                </span>

                                {renderPaginationButtons()}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* 2. GIAO DIỆN MOBILE (Danh sách thẻ dọc theo ảnh 2)*/}
                        {/* ================================================= */}
                        <div className="md:hidden space-y-3.5">
                            <h2 className="text-base font-bold text-gray-900">
                                Danh sách Đơn hàng
                            </h2>

                            {currentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs space-y-3"
                                >
                                    {/* Header thẻ: Mã đơn + Trạng thái */}
                                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                                        <div>
                                            <p className="font-bold text-[#065f46] text-sm">
                                                {order.order_code}
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                Người dùng:{" "}
                                                {order.user_code || "ND002"}
                                            </p>
                                        </div>

                                        {renderStatusColumn(order)}
                                    </div>

                                    {/* Thông tin người nhận & địa chỉ */}
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">
                                                {order.receiver_name}
                                            </p>
                                            <p className="text-gray-400 mt-0.5">
                                                {order.receiver_phone}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Địa chỉ nhận hàng
                                            </p>
                                            <p className="font-medium text-gray-800 mt-0.5">
                                                {order.shipping_address}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Lưới thông tin 2x2 */}
                                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-xs">
                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Ngày đặt
                                            </p>
                                            <p className="font-medium text-gray-800 mt-0.5">
                                                {order.order_date} -{" "}
                                                {order.order_time || "09:42"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Thanh toán
                                            </p>
                                            <p className="font-medium text-gray-800 mt-0.5">
                                                {formatPaymentMethod(
                                                    order.payment_method
                                                )}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Mã giảm giá
                                            </p>
                                            <p className="font-medium text-gray-800 mt-0.5">
                                                {order.voucher_code ||
                                                    "Không áp dụng"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-400">
                                                Tổng tiền
                                            </p>
                                            <p className="font-bold text-[#065f46] text-sm mt-0.5">
                                                {formatCurrency(
                                                    order.total_amount
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Phân trang Mobile */}
                            <div className="flex justify-center pt-2">
                                {renderPaginationButtons()}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}