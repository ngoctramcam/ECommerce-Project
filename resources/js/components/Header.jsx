// AI-assisted [AI-03] - Header 2 tầng responsive kết nối danh mục và số lượng giỏ hàng từ CSDL
// AI-assisted [AI-03] - Header 2 tầng responsive kết nối danh mục và số lượng giỏ hàng từ CSDL
import React, { useState, useEffect, useRef } from "react";
import {
    Link,
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";
import axios from "axios";

export default function Header() {
    // State lưu thông tin tài khoản đang đăng nhập
    // State lưu thông tin tài khoản đang đăng nhập
    const [user, setUser] = useState(null);

    // State đóng/mở menu danh mục
    // State danh mục thật từ CSDL & số lượng sản phẩm trong giỏ hàng
    const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // State đóng/mở menu danh mục
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category") || "all";

    // State & hàm xử lý tìm kiếm từ Header (đã khai báo chuẩn)
    const [searchKeyword, setSearchKeyword] = useState(
        searchParams.get("keyword") || "",
    );

    useEffect(() => {
        setSearchKeyword(searchParams.get("keyword") || "");
    }, [searchParams]);

    const handleHeaderSearch = (e) => {
        e.preventDefault();
        const trimmed = searchKeyword.trim();
        navigate(
            trimmed
                ? `/books?keyword=${encodeURIComponent(trimmed)}`
                : "/books",
        );
    };

    const isHomePage = location.pathname === "/";
    const isBooksPage = location.pathname === "/books";

    // Đọc thông tin user từ localStorage khi tải lại trang
    // Đọc thông tin user từ localStorage khi tải lại trang
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

    // Lấy danh sách danh mục thật từ CSDL
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/api/categories");
                const categoryList = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];
                setCategories(categoryList);
            } catch (error) {
                console.error("Lỗi khi tải danh mục ở Header:", error);
            }
        };

        fetchCategories();
    }, []);

    // Lấy số lượng sản phẩm trong giỏ hàng từ CSDL
    const fetchCartCount = async () => {
        try {
            const res = await axios.get("/api/cart");
            const items = Array.isArray(res.data)
                ? res.data
                : res.data?.items || res.data?.data || [];

            // Tính tổng số lượng các sản phẩm có trong giỏ
            const totalQty = items.reduce(
                (sum, item) => sum + Number(item.quantity || 1),
                0,
            );
            setCartCount(totalQty);
        } catch (error) {
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();

        // Lắng nghe sự kiện cập nhật giỏ hàng từ các trang khác (Thêm/Sửa/Xóa giỏ)
        window.addEventListener("cartUpdated", fetchCartCount);
        return () => window.removeEventListener("cartUpdated", fetchCartCount);
    }, [location.pathname, user]);

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

    // Đăng xuất phía Client
    const handleLogout = async () => {
        try {
            await window.axios.post(
                "/logout",
                {},
                {
                    headers: { Accept: "application/json" },
                },
            );
        } catch (error) {
            console.error("Lỗi khi đăng xuất trên server:", error);
        } finally {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            if (typeof setUser === "function") setUser(null);
            if (typeof setCartCount === "function") setCartCount(0);
            window.location.href = "/login";
        }
    };

    // Chọn danh mục và cuộn xuống khối lọc sách ở Trang chủ
    // Chọn danh mục và cuộn xuống khối lọc sách ở Trang chủ
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
            {/* Header chung (Logo, Tìm kiếm, Đăng nhập, Giỏ hàng) */}
            {/* Header chung (Logo, Tìm kiếm, Đăng nhập, Giỏ hàng) */}
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

                        {/* <--- [TM-02 - Ô tìm kiếm Desktop]: Chuyển kính lúp sang phải thành nút bấm tìm kiếm */}
                        <form
                            onSubmit={handleHeaderSearch}
                            className="hidden md:flex flex-1 max-w-md relative"
                        >
                            <input
                                type="text"
                                enterKeyHint="search"
                                value={searchKeyword}
                                onChange={(e) =>
                                    setSearchKeyword(e.target.value)
                                }
                                placeholder="Tìm tên sách, tác giả..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
                            />
                            {/* Nút submit tìm kiếm khi bấm chuột hoặc Enter */}
                            <button
                                type="submit"
                                aria-label="Tìm kiếm"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-700 text-sm cursor-pointer"
                            >
                                🔍
                            </button>
                        </form>

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
                                    {cartCount}
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Ô tìm kiếm & lối tắt Tất cả sách trên Mobile */}
                    <div className="mt-2.5 md:hidden space-y-2">
                        {/* <--- [TM-02 - Ô tìm kiếm Mobile]: Thêm enterKeyHint="search" và nút bấm 🔍 bên phải để chạm tìm trên điện thoại */}
                        <form
                            onSubmit={handleHeaderSearch}
                            className="relative"
                        >
                            <input
                                type="text"
                                enterKeyHint="search"
                                value={searchKeyword}
                                onChange={(e) =>
                                    setSearchKeyword(e.target.value)
                                }
                                placeholder="Tìm sách, tác giả..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-4 pr-9 text-xs text-gray-700 focus:outline-none focus:bg-white focus:border-emerald-600"
                            />
                            {/* Nút submit tìm kiếm khi chạm ngón tay trên điện thoại */}
                            <button
                                type="submit"
                                aria-label="Tìm kiếm"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-700 text-xs cursor-pointer"
                            >
                                🔍
                            </button>
                        </form>
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

                {/* Menu danh mục Desktop (Trang chủ | Danh mục sách ▼ | Tất cả sách) */}
                {/* Menu danh mục Desktop (Trang chủ | Danh mục sách ▼ | Tất cả sách) */}
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

                                        {categories.map((cat) => (
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

            {/* Thanh điều hướng đáy cho màn hình 360px (Mobile) */}
            {/* Thanh điều hướng đáy cho màn hình 360px (Mobile) */}
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
                            className="w-full flex flex-col items-center justify-center gap-0.5 hover:text-emerald-700 relative"
                        >
                            <span className="text-base relative">
                                🛒
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-2.5 bg-emerald-700 text-white text-[9px] px-1 rounded-full font-bold leading-tight">
                                        {cartCount}
                                    </span>
                                )}
                            </span>

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
                            {categories.map((cat) => (
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
