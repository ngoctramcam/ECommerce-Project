import React from "react";
import { Link } from "react-router-dom";

export default function BottomNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-xs z-50 shadow-lg">
            <Link
                to="/"
                className="flex flex-col items-center text-emerald-700"
            >
                <span>🏠</span> Trang chủ
            </Link>
            <Link
                to="/categories"
                className="flex flex-col items-center text-gray-600"
            >
                <span>📑</span> Danh mục
            </Link>
            <Link
                to="/cart"
                className="flex flex-col items-center text-gray-600 relative"
            >
                <span>🛒</span> Giỏ hàng
                <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    3
                </span>
            </Link>
            <Link
                to="/account"
                className="flex flex-col items-center text-gray-600"
            >
                <span>👤</span> Tài khoản
            </Link>
        </div>
    );
}
