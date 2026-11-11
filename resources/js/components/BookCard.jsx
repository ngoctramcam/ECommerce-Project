import React from "react";

/**
 * Component Thẻ sản phẩm tái sử dụng cho TM-01, TM-02, TM-03
 * @param {Object} book - Thống tin sách (khớp tên trường ERD)
 * @param {Function} onAddToCart - Hàm xử lý khi bấm nút giỏ hàng
 */
export default function BookCard({ book, onAddToCart }) {
    if (!book) return null;

    // Tự động nhận diện cả trường từ ERD (product_name) lẫn dữ liệu giả (title)
    const title = book.product_name || book.title;
    const category = book.category_name || book.category;

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-3 flex flex-col justify-between group">
            {/* 1. Ảnh bìa sách (Trường 'image' trong ERD) */}
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
                {book.image ? (
                    <img
                        src={book.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-3xl opacity-40">📖</span>
                )}
            </div>

            {/* 2. Thông tin chính (Trường 'category_name', 'product_name', 'author') */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {category && (
                        <span className="text-[11px] text-emerald-700 font-medium block mb-1">
                            {category}
                        </span>
                    )}
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1 group-hover:text-emerald-700 transition-colors">
                        {title}
                    </h3>
                    {book.author && (
                        <p className="text-xs text-gray-500 mb-2">
                            {book.author}
                        </p>
                    )}
                </div>

                {/* 3. Giá tiền chuẩn ERD (Trường 'price') & Nút Giỏ hàng */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <span className="text-emerald-700 font-bold text-sm">
                        {Number(book.price || 0).toLocaleString("vi-VN")}₫
                    </span>
                    <button
                        type="button"
                        onClick={() => onAddToCart && onAddToCart(book)}
                        className="bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white p-2 rounded-lg transition-colors text-xs"
                        title="Thêm vào giỏ hàng"
                    >
                        🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
