import React from "react";

// [NGÀY 3 - TV3]: Tạo component "Thẻ sản phẩm" (ảnh, tên, tác giả, giá) để TM-01, TM-02, TM-03 dùng lại
export default function BookCard({ book }) {
    // [KIẾN THỨC TRỌNG TÂM - Chuẩn TM-NFR3]:
    // Tiền lưu trong CSDL dạng số nguyên/decimal (không dùng float) và định dạng kiểu Việt Nam (vd: 128.000 đ)
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(
        book.price || 0,
    );

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
                {/* Ảnh bìa sách chuẩn tỷ lệ 3:4 */}
                <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                    {book.image ? (
                        <img
                            src={book.image}
                            alt={book.product_name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-center text-gray-400 px-2">
                            <span className="text-2xl block mb-1">📘</span>
                            <span className="text-[11px]">Bìa sách</span>
                        </div>
                    )}
                </div>

                {/* [KIẾN THỨC TRỌNG TÂM - Bảo mật NFR-01]: React tự động mã hóa (escape) chuỗi trong {} giúp chống XSS */}
                <h3
                    className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1"
                    title={book.product_name}
                >
                    {book.product_name}
                </h3>

                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {book.author || "Đang cập nhật"}
                </p>
            </div>

            <div className="mt-3">
                <p className="text-emerald-700 font-bold text-sm sm:text-base mb-2.5">
                    {formattedPrice} đ
                </p>
                <button
                    type="button"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
