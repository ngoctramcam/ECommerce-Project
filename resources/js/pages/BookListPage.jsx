import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function BookListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const filterDropdownRef = useRef(null);

    // Đọc các tham số lọc, sắp xếp & phân trang từ URL (khớp camelCase với routes/web.php)
    const keyword = searchParams.get("keyword") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "";
    const page = Number(searchParams.get("page") || 1);

    // State đóng/mở menu dropdown "Bộ lọc"
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // State tạm bên trong dropdown Bộ lọc (gồm Lọc + Sắp xếp)
    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [priceFrom, setPriceFrom] = useState(minPrice);
    const [priceTo, setPriceTo] = useState(maxPrice);
    const [selectedSort, setSelectedSort] = useState(sort);

    // State danh mục & dữ liệu sách phân trang từ API
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    // Đếm số điều kiện lọc/sắp xếp đang bật để hiển thị trên nút Bộ lọc
    const activeFilterCount = [categoryId, minPrice, maxPrice, sort].filter(
        Boolean,
    ).length;

    // Đồng bộ lại các ô trong dropdown khi URL thay đổi
    useEffect(() => {
        setSelectedCategory(categoryId);
        setPriceFrom(minPrice);
        setPriceTo(maxPrice);
        setSelectedSort(sort);
    }, [categoryId, minPrice, maxPrice, sort]);

    // Đóng dropdown Bộ lọc khi bấm chuột ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterDropdownRef.current &&
                !filterDropdownRef.current.contains(event.target)
            ) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lấy danh sách danh mục từ CSDL
    useEffect(() => {
        axios
            .get("/api/categories")
            .then((res) => {
                const list = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];
                setCategories(list);
            })
            .catch((err) => console.error("Lỗi tải danh mục:", err));
    }, []);

    // Gọi API tìm kiếm, lọc, sắp xếp và phân trang phía server (12 cuốn/trang)
    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/books/search", {
                params: {
                    keyword: keyword || undefined,
                    categoryId: categoryId || undefined,
                    minPrice: minPrice || undefined,
                    maxPrice: maxPrice || undefined,
                    sort: sort || undefined,
                    page,
                    per_page: 12,
                },
            })
            .then((res) => {
                const payload = res.data;
                if (Array.isArray(payload?.data)) {
                    setPagination(payload);
                } else if (Array.isArray(payload)) {
                    setPagination({
                        data: payload,
                        current_page: 1,
                        last_page: 1,
                        total: payload.length,
                    });
                } else {
                    setPagination({
                        data: [],
                        current_page: 1,
                        last_page: 1,
                        total: 0,
                    });
                }
            })
            .catch((err) => {
                console.error("Lỗi tải danh sách sách:", err);
                setPagination({
                    data: [],
                    current_page: 1,
                    last_page: 1,
                    total: 0,
                });
            })
            .finally(() => setLoading(false));
    }, [keyword, categoryId, minPrice, maxPrice, sort, page]);

    // Hàm cập nhật tham số lên URL
    const updateUrlParams = (newValues) => {
        const nextParams = new URLSearchParams(searchParams);
        Object.entries(newValues).forEach(([key, val]) => {
            if (val !== "" && val !== null && val !== undefined) {
                nextParams.set(key, val);
            } else {
                nextParams.delete(key);
            }
        });
        setSearchParams(nextParams);
    };

    // Áp dụng bộ lọc & sắp xếp từ dropdown
    const handleApplyFilter = (e) => {
        e.preventDefault();
        updateUrlParams({
            categoryId: selectedCategory,
            minPrice: priceFrom,
            maxPrice: priceTo,
            sort: selectedSort,
            page: 1,
        });
        setIsFilterOpen(false);
    };

    // Đặt lại bộ lọc & sắp xếp về mặc định
    const handleResetFilter = () => {
        setSelectedCategory("");
        setPriceFrom("");
        setPriceTo("");
        setSelectedSort("");
        setSearchParams(keyword ? { keyword } : {});
        setIsFilterOpen(false);
    };

    // Đổi trang
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.last_page) return;
        updateUrlParams({ page: newPage });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
            {/* Breadcrumb (Trang chủ / Tất cả sách) */}
            <nav className="text-xs text-gray-500 mb-1.5">
                <Link to="/" className="hover:text-emerald-700">
                    Trang chủ
                </Link>
                <span className="mx-1.5">/</span>
                <span className="text-gray-700">Tất cả sách</span>
            </nav>

            {/* Hàng tiêu đề "Tất cả sách" + nút dropdown "Bộ lọc ▾" */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-5">
                <div className="flex items-baseline gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {keyword ? `Kết quả cho "${keyword}"` : "Tất cả sách"}
                    </h1>
                    {keyword && (
                        <span className="text-xs sm:text-sm text-gray-500">
                            ({pagination.total} cuốn)
                        </span>
                    )}
                </div>

                {/* Nút Bộ lọc & Khung dropdown xổ xuống */}
                <div
                    className="relative w-full sm:w-auto"
                    ref={filterDropdownRef}
                >
                    <button
                        type="button"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`w-full sm:w-auto min-w-[120px] flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                            activeFilterCount > 0
                                ? "bg-emerald-50 border-emerald-600 text-emerald-700 font-medium"
                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <span>
                            Bộ lọc
                            {activeFilterCount > 0
                                ? ` (${activeFilterCount})`
                                : ""}
                        </span>
                        <span className="text-[10px] text-gray-400">
                            {isFilterOpen ? "▲" : "▼"}
                        </span>
                    </button>

                    {/* Bảng tùy chọn xổ xuống khi bấm Bộ lọc */}
                    {isFilterOpen && (
                        <form
                            onSubmit={handleApplyFilter}
                            className="absolute right-0 mt-2 w-full sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-30 space-y-3.5"
                        >
                            {/* 1. Lọc theo danh mục */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Danh mục
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-emerald-600"
                                >
                                    <option value="">Tất cả danh mục</option>
                                    {categories.map((cat) => (
                                        <option
                                            key={cat.category_id}
                                            value={cat.category_id}
                                        >
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 2. Lọc theo khoảng giá */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Khoảng giá (VNĐ)
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Từ"
                                        value={priceFrom}
                                        onChange={(e) =>
                                            setPriceFrom(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-600"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Đến"
                                        value={priceTo}
                                        onChange={(e) =>
                                            setPriceTo(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-600"
                                    />
                                </div>
                            </div>

                            {/* 3. Sắp xếp theo giá (đã bỏ "Mới nhất") */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    value={selectedSort}
                                    onChange={(e) =>
                                        setSelectedSort(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-emerald-600"
                                >
                                    <option value="">Mặc định</option>
                                    <option value="price_asc">
                                        Giá: Thấp đến Cao
                                    </option>
                                    <option value="price_desc">
                                        Giá: Cao đến Thấp
                                    </option>
                                </select>
                            </div>

                            {/* Nút Đặt lại & Áp dụng */}
                            <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleResetFilter}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    Đặt lại
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Lưới danh sách sách (4 cột Desktop, 2 cột Mobile) */}
            {loading ? (
                <div className="text-center py-16 text-gray-500 text-sm">
                    Đang tải danh sách sách...
                </div>
            ) : pagination.data.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
                    <p className="text-gray-600 font-medium mb-2">
                        Không tìm thấy cuốn sách nào phù hợp.
                    </p>
                    <button
                        type="button"
                        onClick={handleResetFilter}
                        className="text-sm text-emerald-700 hover:underline font-medium cursor-pointer"
                    >
                        Xóa bộ lọc để xem tất cả sách
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                        {pagination.data.map((book) => (
                            <BookCard
                                key={book.book_id || book.id}
                                book={book}
                            />
                        ))}
                    </div>

                    {/* Thanh phân trang Trước 1 2 Sau */}
                    {pagination.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-1.5">
                            <button
                                type="button"
                                disabled={pagination.current_page <= 1}
                                onClick={() =>
                                    handlePageChange(
                                        pagination.current_page - 1,
                                    )
                                }
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-700 hover:border-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Trước
                            </button>

                            {Array.from(
                                { length: pagination.last_page },
                                (_, i) => i + 1,
                            ).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    type="button"
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer ${
                                        pageNum === pagination.current_page
                                            ? "bg-emerald-700 text-white"
                                            : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-600"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={
                                    pagination.current_page >=
                                    pagination.last_page
                                }
                                onClick={() =>
                                    handlePageChange(
                                        pagination.current_page + 1,
                                    )
                                }
                                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-700 hover:border-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
