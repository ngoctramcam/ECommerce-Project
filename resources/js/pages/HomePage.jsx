import React, { useState } from "react";
import BookCard from "../components/BookCard";

// DỮ LIỆU GIẢ CHUẨN ERD
const MOCK_CATEGORIES = [
    { id: "all", name: "Tất cả" },
    { id: "van-hoc", name: "Văn học Việt Nam" },
    { id: "kinh-te", name: "Kinh tế & Quản trị" },
    { id: "ky-nang", name: "Kỹ năng sống" },
    { id: "thieu-nhi", name: "Sách thiếu nhi" },
];

const MOCK_NEW_BOOKS = [
    {
        id: 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        category: "Văn học",
        price: 79000,
    },
    {
        id: 2,
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        category: "Kỹ năng",
        price: 85000,
    },
    {
        id: 3,
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        category: "Kỹ năng",
        price: 68000,
    },
    {
        id: 4,
        title: "Cây Cam Ngọt Của Tôi",
        author: "José Mauro",
        category: "Văn học",
        price: 92000,
    },
];

const MOCK_CATEGORY_BOOKS = [
    {
        id: 5,
        title: "Tư Duy Nhanh Và Chậm",
        author: "Daniel Kahneman",
        category: "Kinh tế & Quản trị",
        price: 145000,
    },
    {
        id: 6,
        title: "Khéo Ăn Nói Sẽ Có Được Thiên Hạ",
        author: "Trác Nhã",
        category: "Kỹ năng sống",
        price: 88000,
    },
    {
        id: 7,
        title: "Số Đỏ",
        author: "Vũ Trọng Phụng",
        category: "Văn học Việt Nam",
        price: 65000,
    },
    {
        id: 8,
        title: "Hoàng Tử Bé",
        author: "Antoine de Saint-Exupéry",
        category: "Sách thiếu nhi",
        price: 55000,
    },
    {
        id: 9,
        title: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        category: "Sách thiếu nhi",
        price: 42000,
    },
    {
        id: 10,
        title: "Cha Giàu Cha Nghèo",
        author: "Robert Kiyosaki",
        category: "Kinh tế & Quản trị",
        price: 115000,
    },
];

export default function HomePage() {
    const [selectedCat, setSelectedCat] = useState("all");

    const filteredCategoryBooks =
        selectedCat === "all"
            ? MOCK_CATEGORY_BOOKS
            : MOCK_CATEGORY_BOOKS.filter((b) => {
                  if (selectedCat === "van-hoc")
                      return b.category === "Văn học Việt Nam";
                  if (selectedCat === "kinh-te")
                      return b.category === "Kinh tế & Quản trị";
                  if (selectedCat === "ky-nang")
                      return b.category === "Kỹ năng sống";
                  if (selectedCat === "thieu-nhi")
                      return b.category === "Sách thiếu nhi";
                  return true;
              });

    return (
        <div className="space-y-10 py-2">
            {/* KHỐI 1: SÁCH MỚI */}
            <section className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span>✨</span> Sách Mới Phát Hành
                        </h2>
                        <p className="text-xs text-gray-500">
                            Những tựa sách mới nhất cập bến Mộc Sách
                        </p>
                    </div>
                    <a
                        href="#"
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                        Xem tất cả &rarr;
                    </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MOCK_NEW_BOOKS.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </section>

            {/* KHỐI 2: KHỐI THEO DANH MỤC */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span>📂</span> Sách Theo Danh Mục
                        </h2>
                        <p className="text-xs text-gray-500">
                            Lọc sách theo chủ đề bạn yêu thích
                        </p>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {MOCK_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCat(cat.id)}
                                className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                                    selectedCat === cat.id
                                        ? "bg-emerald-700 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCategoryBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </section>
        </div>
    );
}
