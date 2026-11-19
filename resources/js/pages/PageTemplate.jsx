import React from "react";

/**
 * [NGÀY 2 - TV3]: Trang mẫu (PageTemplate) dùng MainLayout để cả nhóm tái sử dụng.
 *
 * HƯỚNG DẪN TÁI SỬ DỤNG CHO CÁC THÀNH VIÊN:
 * 1. Copy file này và đổi tên theo chức năng của bạn (vd: CartPage.jsx, ProfilePage.jsx).
 * 2. Không cần gọi lại Header hay Footer vì trang tự động nằm trong <Outlet /> của MainLayout.
 * 3. Khai báo thêm <Route path="duong-dan" element={<TenTrangCuaBan />} /> bên trong <MainLayout /> ở App.jsx.
 */
export default function PageTemplate() {
    return (
        /* Bỏ max-w-7xl mx-auto vì MainLayout đã căn giữa và chia lề chuẩn rồi */
        <div className="py-2 sm:py-4 space-y-5">
            {/* 1. Tiêu đề trang (đồng bộ cỡ chữ với HomePage) */}
            <div className="border-b border-gray-200 pb-3">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                    Tên Trang Tính Năng
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Mô tả ngắn gọn chức năng của trang này
                </p>
            </div>

            {/* 2. Khối chứa nội dung chính (đồng bộ bo góc rounded-xl & viền border-gray-200) */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                <p className="text-gray-600 text-sm">
                    Thành viên trong nhóm viết giao diện chính của mình ở đây...
                </p>
            </div>
        </div>
    );
}
