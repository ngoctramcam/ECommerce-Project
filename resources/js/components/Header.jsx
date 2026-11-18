// AI-assisted [AI-03] - Header 2 tầng responsive có nút Tất cả sách cạnh Danh mục sách (Tuần 1)
import React, { useState, useEffect, useRef } from "react";
import {
    Link,
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";

// [NGÀY 2 & NGÀY 3 - TV3]: Dữ liệu giả danh mục sách
const MOCK_CATEGORIES = [
    { category_id: 1, category_name: "Văn học" },
    { category_id: 2, category_name: "Kỹ năng sống" },
    { category_id: 3, category_name: "Thiếu nhi" },
    { category_id: 4, category_name: "Kinh tế" },
];

export default function Header() {
    // [NGÀY 4 - TV3 - TM-04]: State lưu thông tin tài khoản đang đăng nhập
    const [user, setUser] = useState(null);

    // [NGÀY 2 - TV3]: State đóng/mở menu danh mục
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category") || "all";

    const isHomePage = location.pathname === "/";
    const isBooksPage = location.pathname === "/books";

    // [NGÀY 4 - TV3 - TM-04]: Đọc thông tin user từ localStorage khi tải lại trang
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

    // Đóng menu danh mục khi bấm chuột ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // [NGÀY 4 - TV3 - TM-04]: Đăng xuất phía Client (không gọi API)
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
    };

    // [NGÀY 3 - TV3 - TM-01]: Chọn danh mục và cuộn xuống khối lọc sách ở Trang chủ
    const handleSelectCategory = (categoryId) => {
        setIsDropdownOpen(false);
        setIsMobileCatOpen(false);
        navigate(categoryId === "all" ? "/" : `/?category=${categoryId}`);

        setTimeout(() => {
            const section = document.getElementById("category-books-section");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <>
            {/* [NGÀY 2 - TV3]: Header chung (Logo, Tìm kiếm, Đăng nhập, Giỏ hàng) */}
            <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
                    <div className="flex items-center justify-between gap-3 sm:gap-6">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 shrink-0"
                        >
                            <span className="text-emerald-700 text-xl sm:text-2xl">
                                📖
                            </span>
                            <span className="text-lg sm:text-xl font-bold text-emerald-700 tracking-tight">
                                Mộc Sách
                            </span>
                        </Link>

                        {/* Ô tìm kiếm Desktop */}
                        <div className="hidden md:flex flex-1 max-w-md relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Tìm tên sách, tác giả..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
                            />
                        </div>

                        {/* Khu vực Tài khoản & Giỏ hàng */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
                                        Xin chào,{" "}
                                        <strong className="text-gray-800">
                                            {user.name}
                                        </strong>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-xs sm:text-sm font-medium text-gray-700 hover:text-red-600 bg-white border border-gray-300 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Link
                                        to="/login"
                                        className="text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-700 bg-white border border-gray-300 hover:border-emerald-600 px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-colors"
                                    >
                                        Đăng nhập
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-xs sm:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-colors"
                                    >
                                        Đăng ký
                                    </Link>
                                </div>
                            )}

                            {/* Nút Giỏ hàng */}
                            <Link
                                to="/cart"
                                className="hidden sm:flex items-center gap-1.5 text-gray-700 hover:text-emerald-700 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                <span>🛒</span>
                                <span>Giỏ hàng</span>
                                <span className="bg-emerald-700 text-white text-[11px] px-1.5 py-0.5 rounded-full font-semibold leading-none">
                                    3
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Ô tìm kiếm & lối tắt Tất cả sách trên Mobile */}
                    <div className="mt-2.5 md:hidden space-y-2">
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Tìm sách, tác giả..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-9 pr-4 text-xs text-gray-700 focus:outline-none focus:bg-white focus:border-emerald-600"
                            />
                        </div>
                        <div>
                            <Link
                                to="/books"
                                className={`inline-block text-xs font-medium underline underline-offset-4 ${
                                    isBooksPage
                                        ? "text-emerald-700"
                                        : "text-gray-700 hover:text-emerald-700"
                                }`}
                            >
                                Tất cả sách
                            </Link>
                        </div>
                    </div>
                </div>

                {/* [NGÀY 2 - TV3]: Menu danh mục Desktop (Trang chủ | Danh mục sách ▼ | Tất cả sách) */}
                <nav className="hidden md:block border-t border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("all")}
                                className={`font-medium transition-colors cursor-pointer ${
                                    isHomePage && selectedCategory === "all"
                                        ? "text-emerald-700"
                                        : "text-gray-600 hover:text-emerald-700"
                                }`}
                            >
                                Trang chủ
                            </button>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer"
                                >
                                    <span>Danh mục sách</span>
                                    <span className="text-[10px]">
                                        {isDropdownOpen ? "▲" : "▼"}
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <ul className="absolute left-0 top-full mt-2 w-56 bg-white text-gray-700 shadow-lg rounded-lg border border-gray-200 py-1.5 z-50 list-none m-0 max-h-72 overflow-y-auto">
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleSelectCategory("all")
                                                }
                                                className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                                                    isHomePage &&
                                                    selectedCategory === "all"
                                                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                                                        : "hover:bg-gray-50 hover:text-emerald-700"
                                                }`}
                                            >
                                                Tất cả danh mục
                                            </button>
                                        </li>

                                        {MOCK_CATEGORIES.map((cat) => (
                                            <li key={cat.category_id}>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelectCategory(
                                                            cat.category_id,
                                                        )
                                                    }
                                                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                                                        isHomePage &&
                                                        String(
                                                            selectedCategory,
                                                        ) ===
                                                            String(
                                                                cat.category_id,
                                                            )
                                                            ? "bg-emerald-50 text-emerald-700 font-semibold"
                                                            : "hover:bg-gray-50 hover:text-emerald-700"
                                                    }`}
                                                >
                                                    {cat.category_name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Nút Tất cả sách nằm ngay bên cạnh Danh mục sách */}
                            <Link
                                to="/books"
                                className={`font-medium transition-colors ${
                                    isBooksPage
                                        ? "text-emerald-700"
                                        : "text-gray-600 hover:text-emerald-700"
                                }`}
                            >
                                Tất cả sách
                            </Link>
                        </div>

                        {/* Chỉ hiện chữ "Tài khoản" sau khi đã đăng nhập */}
                        {user && (
                            <div>
                                <Link
                                    to="/profile"
                                    className="text-gray-600 hover:text-emerald-700 font-medium transition-colors"
                                >
                                    Tài khoản
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {/* [NGÀY 2 - TV3]: Thanh điều hướng đáy cho màn hình 360px (Mobile) */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-50">
                <ul className="grid grid-cols-4 h-14 items-center text-[11px] font-medium text-gray-500 list-none m-0 p-0">
                    <li>
                        <button
                            type="button"
                            onClick={() => handleSelectCategory("all")}
                            className={`w-full flex flex-col items-center justify-center gap-0.5 ${
                                isHomePage
                                    ? "text-emerald-700"
                                    : "hover:text-emerald-700"
                            }`}
                        >
                            <span className="text-base">🏠</span>
                            <span>Trang chủ</span>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
                            className="w-full flex flex-col items-center justify-center gap-0.5 hover:text-emerald-700"
                        >
                            <span className="text-base">⊞</span>
                            <span>Danh mục</span>
                        </button>
                    </li>
                    <li>
                        <Link
                            to="/cart"
                            className="w-full flex flex-col items-center justify-center gap-0.5 hover:text-emerald-700"
                        >
                            <span className="text-base">🛒</span>
                            <span>Giỏ hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={user ? "/profile" : "/login"}
                            className="w-full flex flex-col items-center justify-center gap-0.5 hover:text-emerald-700"
                        >
                            <span className="text-base">👤</span>
                            <span>{user ? "Tài khoản" : "Đăng nhập"}</span>
                        </Link>
                    </li>
                </ul>

                {isMobileCatOpen && (
                    <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-700">
                                Chọn danh mục sách
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsMobileCatOpen(false)}
                                className="text-xs text-gray-400"
                            >
                                Đóng ✕
                            </button>
                        </div>
                        <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handleSelectCategory("all")}
                                    className="px-3 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 font-medium"
                                >
                                    Tất cả
                                </button>
                            </li>
                            {MOCK_CATEGORIES.map((cat) => (
                                <li key={cat.category_id}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSelectCategory(
                                                cat.category_id,
                                            )
                                        }
                                        className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                                    >
                                        {cat.category_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
}
