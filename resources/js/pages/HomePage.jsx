import React from "react";

export default function HomePage() {
    return (
        <div className="space-y-6">
            {/* Banner */}
            <div className="bg-emerald-700 text-white p-8 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold mb-2">
                    Mộc Sách — Nhã Nam & NXB Trẻ
                </h1>
                <p className="text-emerald-100">
                    Giảm giá lên đến 30% cho tất cả đơn hàng từ 299k.
                </p>
            </div>

            {/* Danh sách sách */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    📚 Sách Mới Phổ Biến
                </h2>
                <p className="text-gray-500 text-sm">
                    Nội dung danh sách sách sẽ hiển thị ở đây...
                </p>
            </div>
        </div>
    );
}
