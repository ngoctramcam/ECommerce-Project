import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("vi-VN") + "đ";

const ITEMS_PER_PAGE = 5;

export default function AdminVouchersPage() {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // State Form Thêm / Sửa
    const [editingId, setEditingId] = useState(null);
    const [code, setCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [formError, setFormError] = useState("");

    // State Tìm kiếm & Phân trang
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Lấy danh sách mã giảm giá
    const fetchVouchers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/admin/vouchers");
            const list = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                ? res.data.data
                : [];
            setVouchers(list);
        } catch (error) {
            console.error("Lỗi khi tải danh sách voucher:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    // Lọc danh sách theo từ khóa tìm kiếm
    const filteredVouchers = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return vouchers;
        return vouchers.filter(
            (v) =>
                String(v.code || "").toLowerCase().includes(q) ||
                String(v.voucher_code_id || "").toLowerCase().includes(q)
        );
    }, [vouchers, searchQuery]);

    // Reset về trang 1 khi tìm kiếm
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Tính toán phân trang
    const totalPages = Math.max(
        1,
        Math.ceil(filteredVouchers.length / ITEMS_PER_PAGE)
    );
    const paginatedVouchers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredVouchers.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredVouchers, currentPage]);

    const startIndex =
        filteredVouchers.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = Math.min(
        currentPage * ITEMS_PER_PAGE,
        filteredVouchers.length
    );

    // Nút "Làm mới" form
    const handleResetForm = () => {
        setEditingId(null);
        setCode("");
        setDiscountAmount("");
        setExpiryDate("");
        setFormError("");
    };

    // Đưa dữ liệu voucher lên Form để sửa
    const handleEditClick = (voucher) => {
        setEditingId(voucher.id);
        setCode(voucher.code || "");
        setDiscountAmount(String(voucher.discount_amount || ""));
        setExpiryDate(voucher.expiry_date || "");
        setFormError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Lưu mã giảm giá (Thêm mới hoặc Cập nhật)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!code.trim() || !discountAmount || !expiryDate) {
            setFormError("Vui lòng điền đầy đủ thông tin trước khi lưu.");
            return;
        }

        if (Number(discountAmount) < 1000) {
            setFormError("Số tiền giảm tối thiểu phải từ 1.000đ.");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                code: code.trim().toUpperCase(),
                discount_amount: Number(discountAmount),
                expiry_date: expiryDate,
            };

            if (editingId) {
                await axios.put(`/api/admin/vouchers/${editingId}`, payload);
            } else {
                await axios.post("/api/admin/vouchers", payload);
            }

            await fetchVouchers();
            handleResetForm();
        } catch (error) {
            setFormError(
                error.response?.data?.message ||
                    "Có lỗi xảy ra khi lưu mã giảm giá. Vui lòng thử lại!"
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Xóa mã giảm giá
    const handleDeleteClick = async (voucher) => {
        if (
            !window.confirm(
                `Bạn có chắc chắn muốn xóa mã giảm giá "${voucher.code}" không?`
            )
        ) {
            return;
        }

        try {
            await axios.delete(`/api/admin/vouchers/${voucher.id}`);
            if (editingId === voucher.id) {
                handleResetForm();
            }
            await fetchVouchers();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Không thể xóa mã giảm giá này!"
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Tiêu đề trang */}
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Quản lý Mã giảm giá
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Tạo và quản lý các mã giảm giá áp dụng cho đơn hàng.
                </p>
            </div>

            {/* Layout chính: Desktop 12 cột (Form 4 cột trái + Bảng 8 cột phải) | Mobile xếp dọc */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ===================================================== */}
                {/* CỘT TRÁI: FORM THÊM / SỬA MÃ GIẢM GIÁ                 */}
                {/* ===================================================== */}
                <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                    <div className="mb-4">
                        <h2 className="text-base font-bold text-gray-900">
                            {editingId
                                ? "Sửa Mã giảm giá"
                                : "Thêm / Sửa Mã giảm giá"}
                        </h2>
                        <p className="hidden sm:block text-xs text-gray-400 mt-0.5">
                            Thông tin cơ bản của mã giảm giá.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Mã voucher
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value.toUpperCase())
                                }
                                placeholder="VD: MOC15"
                                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-700 uppercase"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Số tiền giảm (VNĐ)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1000"
                                value={discountAmount}
                                onChange={(e) =>
                                    setDiscountAmount(e.target.value)
                                }
                                placeholder="VD: 15000"
                                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-700"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Ngày hết hạn
                            </label>
                            <input
                                type="date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-emerald-700"
                            />
                        </div>

                        {formError && (
                            <p className="text-xs text-red-600 font-medium">
                                {formError}
                            </p>
                        )}

                        {/* Nút Lưu & Làm mới */}
                        <div className="grid grid-cols-2 sm:flex items-center gap-2.5 pt-1">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {submitting
                                    ? "Đang lưu..."
                                    : editingId
                                    ? "Cập nhật"
                                    : "Lưu mã giảm giá"}
                            </button>

                            <button
                                type="button"
                                onClick={handleResetForm}
                                className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                            >
                                Làm mới
                            </button>
                        </div>

                        <p className="hidden sm:block text-[11px] text-gray-400 pt-1">
                            Điền đầy đủ thông tin trước khi lưu.
                        </p>
                    </form>
                </div>

                {/* ===================================================== */}
                {/* CỘT PHẢI: DANH SÁCH MÃ GIẢM GIÁ                       */}
                {/* ===================================================== */}
                <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                    {/* Header Danh sách + Ô tìm kiếm */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Danh sách Mã giảm giá
                            </h2>
                            <p className="hidden sm:block text-xs text-gray-400 mt-0.5">
                                {filteredVouchers.length} mã giảm giá
                            </p>
                        </div>

                        <div className="relative w-full sm:w-64">
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
                                placeholder="Tìm kiếm mã voucher..."
                                className="w-full pl-9 pr-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-700"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-12 text-center text-xs sm:text-sm text-gray-500">
                            Đang tải danh sách mã giảm giá...
                        </div>
                    ) : paginatedVouchers.length === 0 ? (
                        <div className="py-12 text-center text-xs sm:text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl">
                            Không có mã giảm giá nào phù hợp.
                        </div>
                    ) : (
                        <>
                            {/* GIAO DIỆN DESKTOP: BẢNG DỮ LIỆU */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-[11px] font-medium text-gray-400">
                                            <th className="py-3 pr-3">Mã</th>
                                            <th className="py-3 px-3">
                                                Mã giảm giá
                                            </th>
                                            <th className="py-3 px-3">
                                                Số tiền giảm
                                            </th>
                                            <th className="py-3 px-3">
                                                Ngày hết hạn
                                            </th>
                                            <th className="py-3 px-3">
                                                Ngày tạo
                                            </th>
                                            <th className="py-3 px-3">
                                                Cập nhật
                                            </th>
                                            <th className="py-3 pl-3 text-right">
                                                Thao tác
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-xs">
                                        {paginatedVouchers.map((voucher) => (
                                            <tr
                                                key={voucher.id}
                                                className={`hover:bg-gray-50/70 transition-colors ${
                                                    editingId === voucher.id
                                                        ? "bg-emerald-50/40"
                                                        : ""
                                                }`}
                                            >
                                                <td className="py-3.5 pr-3 font-semibold text-emerald-800">
                                                    {voucher.voucher_code_id}
                                                </td>
                                                <td className="py-3.5 px-3">
                                                    <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-bold tracking-wide">
                                                        {voucher.code}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-3 font-bold text-gray-900">
                                                    {formatCurrency(
                                                        voucher.discount_amount
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-3 text-gray-600">
                                                    {voucher.expiry_display}
                                                </td>
                                                <td className="py-3.5 px-3 text-gray-500">
                                                    {voucher.created_at}
                                                </td>
                                                <td className="py-3.5 px-3 text-gray-500">
                                                    {voucher.updated_at}
                                                </td>
                                                <td className="py-3.5 pl-3">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    voucher
                                                                )
                                                            }
                                                            title="Sửa"
                                                            className="w-8 h-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                                                        >
                                                            <svg
                                                                className="w-3.5 h-3.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                                />
                                                            </svg>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    voucher
                                                                )
                                                            }
                                                            title="Xóa"
                                                            className="w-8 h-8 rounded-lg border border-red-200 hover:bg-red-50 flex items-center justify-center text-red-600 transition-colors cursor-pointer"
                                                        >
                                                            <svg
                                                                className="w-3.5 h-3.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* GIAO DIỆN MOBILE: DANH SÁCH THẺ (CARD) */}
                            <div className="sm:hidden space-y-3.5">
                                {paginatedVouchers.map((voucher) => (
                                    <div
                                        key={voucher.id}
                                        className="p-4 rounded-xl border border-gray-200 bg-white space-y-2.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide">
                                                {voucher.code}
                                            </span>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {voucher.voucher_code_id}
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-gray-900">
                                                Giảm:{" "}
                                                {formatCurrency(
                                                    voucher.discount_amount
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Hết hạn:{" "}
                                                {voucher.expiry_display}
                                            </p>
                                            <p className="text-[11px] text-gray-400">
                                                Cập nhật: {voucher.updated_at}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEditClick(voucher)
                                                }
                                                className="py-2 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                                <span>Sửa</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteClick(voucher)
                                                }
                                                className="py-2 px-3 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                                <span>Xóa</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Phân trang */}
                            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <p className="text-xs text-gray-400">
                                    Hiển thị {startIndex}–{endIndex} trên{" "}
                                    {filteredVouchers.length} mã giảm giá
                                </p>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.max(1, p - 1)
                                            )
                                        }
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                                    >
                                        Trước
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, idx) => idx + 1
                                    ).map((page) => (
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
                                    ))}

                                    <button
                                        type="button"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((p) =>
                                                Math.min(totalPages, p + 1)
                                            )
                                        }
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
                                    >
                                        Sau
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}