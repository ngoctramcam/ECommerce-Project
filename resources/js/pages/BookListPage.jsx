import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

export default function BookListPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Đọc từ khóa tìm kiếm & số trang từ URL
    const keyword = searchParams.get("keyword") || "";
    const page = Number(searchParams.get("page") || 1);

    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    // Gọi API tìm kiếm và phân trang phía server (12 cuốn/trang)
    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/books/search", {
                params: {
                    keyword: keyword || undefined,
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
    }, [keyword, page]);

    // Đổi trang
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.last_page) return;
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", newPage);
        setSearchParams(nextParams);
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

            {/* Tiêu đề trang */}
            <div className="flex items-baseline gap-2 mb-5">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {keyword ? `Kết quả cho "${keyword}"` : "Tất cả sách"}
                </h1>
                {keyword && (
                    <span className="text-xs sm:text-sm text-gray-500">
                        ({pagination.total} cuốn)
                    </span>
                )}
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
                    {keyword && (
                        <button
                            type="button"
                            onClick={() => setSearchParams({})}
                            className="text-sm text-emerald-700 hover:underline font-medium cursor-pointer"
                        >
                            Xem tất cả sách
                        </button>
                    )}
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
