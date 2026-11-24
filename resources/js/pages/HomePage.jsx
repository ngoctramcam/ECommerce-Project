// AI-assisted [AI-04] - Giao diện Trang chủ TM-01 kết nối dữ liệu thật từ CSDL
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");
    const [activeCategory, setActiveCategory] = useState(urlCategory || "all");

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setActiveCategory(urlCategory || "all");
    }, [urlCategory]);

    // Lấy danh sách sản phẩm và danh mục thật từ CSDL
    useEffect(() => {
        const fetchHomeData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get("/api/products"),
                    axios.get("/api/categories"),
                ]);

                const productList = Array.isArray(productsRes.data)
                    ? productsRes.data
                    : productsRes.data?.data || [];

                const categoryList = Array.isArray(categoriesRes.data)
                    ? categoriesRes.data
                    : categoriesRes.data?.data || [];

                // Chỉ hiển thị các sản phẩm đang kinh doanh (status = 1)
                const activeProducts = productList.filter(
                    (book) => Number(book.status) === 1
                );

                setProducts(activeProducts);
                setCategories(categoryList);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu trang chủ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Khối 2: Lọc theo danh mục đang chọn
    // Khối 1: 6 cuốn sách mới phát hành nhất (API đã orderByDesc product_id)
    const newestBooks = products.slice(0, 6);

    // Khối 2: Lọc theo danh mục đang chọn
    const categoryBooks =
        activeCategory === "all"
            ? products
            : products.filter(
                  (book) => String(book.category_id) === String(activeCategory)
              );

    const handleTabClick = (categoryId) => {
        setActiveCategory(categoryId);
        setSearchParams(categoryId === "all" ? {} : { category: categoryId });
    };

    if (loading) {
        return (
            <div className="py-12 text-center text-sm text-gray-500">
                Đang tải danh sách sách...
            </div>
        );
    }

    if (loading) {
        return (
            <div className="py-12 text-center text-sm text-gray-500">
                Đang tải danh sách sách...
            </div>
        );
    }

    return (
        <div className="py-4 sm:py-6 space-y-10">
            {/* Khối 1 - Sách Mới Phát Hành (lướt ngang) */}
            {/* Khối 1 - Sách Mới Phát Hành (lướt ngang) */}
            <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    Sách Mới Phát Hành
                </h2>

                {newestBooks.length > 0 ? (
                    <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth">
                        {newestBooks.map((book) => (
                            <div
                                key={book.product_id}
                                className="w-[calc(50%-6px)] md:w-[calc(25%-15px)] shrink-0 snap-start"
                            >
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg py-8 text-center">
                        Chưa có sách mới phát hành.
                    </p>
                )}
                {newestBooks.length > 0 ? (
                    <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth">
                        {newestBooks.map((book) => (
                            <div
                                key={book.product_id}
                                className="w-[calc(50%-6px)] md:w-[calc(25%-15px)] shrink-0 snap-start"
                            >
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg py-8 text-center">
                        Chưa có sách mới phát hành.
                    </p>
                )}
            </section>

            {/* Khối 2 - Sách Theo Danh Mục (lướt ngang) */}
            {/* Khối 2 - Sách Theo Danh Mục (lướt ngang) */}
            <section id="category-books-section" className="scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                    Sách Theo Danh Mục
                </h2>

                {/* Dãy nút lọc dạng thẻ bo tròn (Pill Tabs) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5">
                    <button
                        type="button"
                        onClick={() => handleTabClick("all")}
                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            String(activeCategory) === "all"
                                ? "bg-emerald-700 text-white"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-700"
                        }`}
                    >
                        Tất cả
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.category_id}
                            type="button"
                            onClick={() => handleTabClick(cat.category_id)}
                            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                                String(activeCategory) ===
                                String(cat.category_id)
                                    ? "bg-emerald-700 text-white"
                                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-600 hover:text-emerald-700"
                            }`}
                        >
                            {cat.category_name}
                        </button>
                    ))}
                </div>

                {categoryBooks.length > 0 ? (
                    <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth">
                        {categoryBooks.map((book) => (
                            <div
                                key={book.product_id}
                                className="w-[calc(50%-6px)] md:w-[calc(25%-15px)] shrink-0 snap-start"
                            >
                                <BookCard book={book} />
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg py-8 text-center">
                        Chưa có sách thuộc danh mục này.
                    </p>
                )}
            </section>
        </div>
    );
}