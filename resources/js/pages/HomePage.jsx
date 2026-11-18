// AI-assisted [AI-04] - Giao diện Trang chủ TM-01 hỗ trợ lướt ngang (Tuần 1)
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";

// [NGÀY 3 - TV3 - TM-01]: Dữ liệu giả danh mục & sản phẩm (đủ số lượng để test lướt ngang)
const MOCK_CATEGORIES = [
    { category_id: 1, category_name: "Văn học" },
    { category_id: 2, category_name: "Kỹ năng sống" },
    { category_id: 3, category_name: "Thiếu nhi" },
    { category_id: 4, category_name: "Kinh tế" },
];

const MOCK_PRODUCTS = [
    {
        product_id: 1,
        product_name: "Những ngày xanh",
        author: "Nguyễn An",
        price: 128000,
        category_id: 1,
        image: "",
    },
    {
        product_id: 2,
        product_name: "Đi qua mùa gió",
        author: "Trần Minh",
        price: 96000,
        category_id: 1,
        image: "",
    },
    {
        product_id: 3,
        product_name: "Một thoáng bình yên",
        author: "Lê Hà",
        price: 115000,
        category_id: 2,
        image: "",
    },
    {
        product_id: 4,
        product_name: "Chạm vào nắng mai",
        author: "Phạm Linh",
        price: 142000,
        category_id: 3,
        image: "",
    },
    {
        product_id: 5,
        product_name: "Dế Mèn phiêu lưu ký",
        author: "Tô Hoài",
        price: 68000,
        category_id: 3,
        image: "",
    },
    {
        product_id: 6,
        product_name: "Tuổi trẻ đáng giá bao nhiêu?",
        author: "Rosie Nguyễn",
        price: 90000,
        category_id: 2,
        image: "",
    },
    {
        product_id: 7,
        product_name: "Tư duy nhanh và chậm",
        author: "Daniel Kahneman",
        price: 185000,
        category_id: 4,
        image: "",
    },
    {
        product_id: 8,
        product_name: "Nhà đầu tư thông minh",
        author: "Benjamin Graham",
        price: 195000,
        category_id: 4,
        image: "",
    },
    {
        product_id: 9,
        product_name: "Mắt biếc",
        author: "Nguyễn Nhật Ánh",
        price: 110000,
        category_id: 1,
        image: "",
    },
    {
        product_id: 10,
        product_name: "Cánh đồng bất tận",
        author: "Nguyễn Ngọc Tư",
        price: 85000,
        category_id: 1,
        image: "",
    },
    {
        product_id: 11,
        product_name: "Cho tôi xin một vé đi tuổi thơ",
        author: "Nguyễn Nhật Ánh",
        price: 80000,
        category_id: 1,
        image: "",
    },
];

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlCategory = searchParams.get("category");
    const [activeCategory, setActiveCategory] = useState(urlCategory || "all");

    useEffect(() => {
        setActiveCategory(urlCategory || "all");
    }, [urlCategory]);

    // Khối 1: 6 cuốn sách mới phát hành (hiển thị 4 cuốn đầu, lướt ngang để xem tiếp cuốn 5, 6)
    const newestBooks = MOCK_PRODUCTS.slice(0, 6);

    // Khối 2: Lọc trực tiếp từ mảng dữ liệu giả theo danh mục đang chọn
    const categoryBooks =
        activeCategory === "all"
            ? MOCK_PRODUCTS
            : MOCK_PRODUCTS.filter(
                  (book) => String(book.category_id) === String(activeCategory),
              );

    const handleTabClick = (categoryId) => {
        setActiveCategory(categoryId);
        setSearchParams(categoryId === "all" ? {} : { category: categoryId });
    };

    return (
        <div className="py-4 sm:py-6 space-y-10">
            {/* [NGÀY 3 - TV3 - TM-01]: Khối 1 - Sách Mới Phát Hành (lướt ngang) */}
            <section>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    Sách Mới Phát Hành
                </h2>

                {/* Hàng ngang: hiện 2 thẻ trên Mobile, 4 thẻ trên Desktop, vuốt/cuộn ngang để xem thêm */}
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
            </section>

            {/* [NGÀY 3 - TV3 - TM-01]: Khối 2 - Sách Theo Danh Mục (lướt ngang) */}
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

                    {MOCK_CATEGORIES.map((cat) => (
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
                                <BookCard key={book.product_id} book={book} />
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
