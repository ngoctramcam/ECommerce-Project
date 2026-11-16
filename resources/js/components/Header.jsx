import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            localStorage.removeItem("user");
        }
    }, []);

    const handleLogout = async () => {
        try {
            // Mục đích: Hủy phiên đăng nhập (session) và làm mới CSRF token trên Server Laravel
            await window.axios.post("/logout");
        } catch (error) {
            // ]: Bắt lỗi phòng trường hợp session trên server đã tự hết hạn trước đó
            console.error("Lỗi khi gọi API đăng xuất:", error);
        } finally {
            // Dù server trả về thành công hay báo lỗi hết hạn phiên, trình duyệt vẫn luôn xóa sạch dữ liệu cũ
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Đặt lại user về null để Header chuyển về 2 nút Đăng nhập / Đăng ký và đưa về trang /login
            setUser(null);
            window.location.href = "/login";
        }
    };
    // ====================   ====================

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            {/* 1. Topbar thông báo */}
            <div className="bg-emerald-800 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="truncate">
                        🚚 Sách thật, trí thức thật • Miễn phí giao từ 299k
                    </span>
                    <span className="shrink-0 hidden xs:inline">
                        Hotline:{" "}
                        <strong className="text-emerald-200">1900 6868</strong>
                    </span>
                </div>
            </div>

            {/* 2. Thanh Header chính */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-6">
                {/* Logo */}
                <Link to="/" className="flex flex-col shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-tight">
                        Mộc Sách
                    </span>
                    <span className="text-[10px] text-gray-400 -mt-1 font-medium hidden sm:inline">
                        Mở sách, mở thế giới
                    </span>
                </Link>

                {/* Ô tìm kiếm */}
                <div className="flex-1 max-w-xl relative">
                    <input
                        type="text"
                        placeholder="Tìm sách, tác giả..."
                        className="w-full bg-gray-100 border border-gray-200 rounded-full py-1.5 sm:py-2 pl-3 sm:pl-4 pr-9 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700 text-xs sm:text-sm">
                        🔍
                    </button>
                </div>

                {/* Khu vực Tài khoản & Giỏ hàng */}
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    {/* [KẾT HỢP TV3 & TV2]: Hiển thị tên thật (user.name) lấy từ Database TV2 khi đã đăng nhập */}
                    {user ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                                <span>👤</span>
                                <span className="max-w-[85px] sm:max-w-[140px] truncate font-semibold">
                                    {user.name}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Link
                                to="/login"
                                className="text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-50 border border-emerald-600 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="text-xs sm:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}

                    {/* Nút Giỏ hàng */}
                    <Link
                        to="/cart"
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-100 transition-colors"
                    >
                        <span>🛒</span>
                        <span className="hidden md:inline">Giỏ hàng</span>
                        <span className="bg-emerald-600 text-white text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold">
                            3
                        </span>
                    </Link>
                </div>
            </div>

            {/* 3. Menu danh mục  */}
            <CategoryMenu />
        </header>
    );
}
