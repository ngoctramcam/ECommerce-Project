import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

// Dữ liệu mẫu đồng bộ trường CSDL (product_id, product_name) với BookCard
const MOCK_BOOKS = [
    {
        product_id: 1,
        product_name: "Những ngày xanh",
        author: "Nguyễn An",
        category: "Văn học",
        price: 128000,
    },
    {
        product_id: 2,
        product_name: "Đi qua mùa gió",
        author: "Trần Minh",
        category: "Văn học",
        price: 96000,
    },
    {
        product_id: 3,
        product_name: "Một thoáng bình yên",
        author: "Lê Hà",
        category: "Kỹ năng sống",
        price: 115000,
    },
    {
        product_id: 4,
        product_name: "Chạm vào nắng mai",
        author: "Phạm Linh",
        category: "Thiếu nhi",
        price: 142000,
    },
    {
        product_id: 5,
        product_name: "Tư Duy Nhanh Và Chậm",
        author: "Daniel Kahneman",
        category: "Kinh tế",
        price: 145000,
    },
    {
        product_id: 6,
        product_name: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        category: "Kỹ năng sống",
        price: 68000,
    },
    {
        product_id: 7,
        product_name: "Số Đỏ",
        author: "Vũ Trọng Phụng",
        category: "Văn học",
        price: 65000,
    },
    {
        product_id: 8,
        product_name: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        category: "Thiếu nhi",
        price: 55000,
    },
    {
        product_id: 9,
        product_name: "Nhà Đầu Tư Thông Minh",
        author: "Benjamin Graham",
        category: "Kinh tế",
        price: 195000,
    },
];

const CATEGORIES = [
    "Tất cả",
    "Văn học",
    "Kỹ năng sống",
    "Thiếu nhi",
    "Kinh tế",
];

export default function BookListPage() {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Lọc và sắp xếp trên dữ liệu khung
    const filteredBooks = useMemo(() => {
        return MOCK_BOOKS.filter((book) => {
            if (
                selectedCategory !== "Tất cả" &&
                book.category !== selectedCategory
            ) {
                return false;
            }
            if (minPrice !== "" && book.price < Number(minPrice)) {
                return false;
            }
            if (maxPrice !== "" && book.price > Number(maxPrice)) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            return b.product_id - a.product_id; // newest
        });
    }, [selectedCategory, minPrice, maxPrice, sortBy]);

    const handleResetFilter = () => {
        setSelectedCategory("Tất cả");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("newest");
    };

    return (
        <div className="space-y-6 py-2">
            {/* 1. Breadcrumb điều hướng */}
            <nav className="text-xs text-gray-500 flex items-center gap-1.5">
                <Link to="/" className="hover:text-emerald-700">
                    Trang chủ
                </Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Tất cả sách</span>
            </nav>

            {/* Nút mở bộ lọc trên Mobile */}
            <div className="flex items-center justify-between lg:hidden">
                <button
                    type="button"
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    {showMobileFilter ? "✕ Đóng bộ lọc" : "≡ Bộ lọc tìm kiếm"}
                </button>
                <span className="text-xs text-gray-500">
                    Tìm thấy <strong>{filteredBooks.length}</strong> cuốn sách
                </span>
            </div>

            {/* 2. Bố cục chính 2 cột: Sidebar bộ lọc (trái) + Lưới sách (phải) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Cột Bộ lọc */}
                <aside
                    className={`${
                        showMobileFilter ? "block" : "hidden"
                    } lg:block bg-white p-4 rounded-xl border border-gray-200 space-y-5`}
                >
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3">
                            Danh mục sách
                        </h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map((cat) => (
                                <li key={cat}>
                                    <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat}
                                            onChange={() =>
                                                setSelectedCategory(cat)
                                            }
                                            className="accent-emerald-700"
                                        />
                                        <span>{cat}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-3">
                            Khoảng giá (VNĐ)
                        </h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="Từ"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                type="number"
                                placeholder="Đến"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-700"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleResetFilter}
                        className="w-full py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Xóa tất cả bộ lọc
                    </button>
                </aside>

                {/* Cột Kết quả & Lưới sản phẩm */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Thanh trạng thái & Sắp xếp */}
                    <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs text-gray-600 hidden lg:block">
                            Hiển thị{" "}
                            <span className="font-semibold text-gray-900">
                                {filteredBooks.length}
                            </span>{" "}
                            sản phẩm phù hợp
                        </p>

                        <div className="flex items-center gap-2 ml-auto">
                            <label
                                htmlFor="sort"
                                className="text-xs text-gray-500"
                            >
                                Sắp xếp theo:
                            </label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-emerald-700"
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="price-asc">
                                    Giá: Thấp đến Cao
                                </option>
                                <option value="price-desc">
                                    Giá: Cao đến Thấp
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Lưới BookCard */}
                    {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredBooks.map((book) => (
                                <BookCard key={book.product_id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-xl border border-gray-200 text-center space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                                Không tìm thấy cuốn sách nào phù hợp với bộ lọc.
                            </p>
                            <button
                                type="button"
                                onClick={handleResetFilter}
                                className="text-xs font-semibold text-emerald-700 hover:underline"
                            >
                                Đặt lại bộ lọc
                            </button>
                        </div>
                    )}

                    {/* Khung phân trang (Pagination) */}
                    <div className="flex items-center justify-center gap-1.5 pt-4">
                        <button
                            type="button"
                            disabled
                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed"
                        >
                            &laquo; Trước
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                            Sau &raquo;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
