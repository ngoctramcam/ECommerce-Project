import React from "react";

export default function PageTemplate() {
    return (
        /* Khung ngoài tự động căn giữa màn hình và cách lề chuẩn responsive */
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
            {/* 1. Tiêu đề trang / Breadcrumb (Tên trang) */}
            <div className="border-b border-gray-200 pb-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Tên Trang Tính Năng
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Mô tả ngắn gọn chức năng của trang này
                </p>
            </div>

            {/* 2. Khối chứa nội dung chính */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <p className="text-gray-600 text-sm">
                    Thành viên trong nhóm viết giao diện chính của mình ở đây...
                </p>
            </div>
        </div>
    );
}
