import React from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

export default function Header() {
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

            {/* 2. Thanh Header chính (Logo, Tìm kiếm, Tài khoản, Giỏ hàng) */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
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

                {/* Nút Tài khoản & Giỏ hàng */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <Link
                        to="/login"
                        className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-700 py-1 px-2 rounded-lg hover:bg-gray-50"
                    >
                        <span>👤</span>
                        <span className="hidden sm:inline">Tài khoản</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-100 transition-colors"
                    >
                        <span>🛒</span>
                        <span className="hidden xs:inline">Giỏ hàng</span>
                        <span className="bg-emerald-600 text-white text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold">
                            3
                        </span>
                    </Link>
                </div>
            </div>

            {/* 3. Gọi Component CategoryMenu */}
            <CategoryMenu />
        </header>
    );
}
