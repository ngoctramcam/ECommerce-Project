import React from "react";
import { Link } from "react-router-dom";

export default function CategoryMenu() {
    return (
        <div className="border-t border-gray-100 bg-white hidden md:block">
            <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6 text-sm font-medium py-2.5 overflow-x-auto whitespace-nowrap">
                <Link
                    to="/categories"
                    className="flex items-center gap-2 font-bold text-gray-800 hover:text-emerald-700 shrink-0"
                >
                    <span>≡</span> Danh mục sách
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                    to="/"
                    className="text-emerald-700 font-semibold hover:text-emerald-800"
                >
                    Trang chủ
                </Link>
                <Link
                    to="/best-sellers"
                    className="text-gray-700 hover:text-emerald-700"
                >
                    Sách bán chạy
                </Link>
                <Link
                    to="/new-arrivals"
                    className="text-gray-700 hover:text-emerald-700"
                >
                    Sách mới
                </Link>
                <Link
                    to="/promotions"
                    className="text-gray-700 hover:text-emerald-700"
                >
                    Khuyến mãi
                </Link>
                <Link
                    to="/authors"
                    className="text-gray-700 hover:text-emerald-700"
                >
                    Góc tác giả
                </Link>
            </div>
        </div>
    );
}
