import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// [NGÀY 1 & NGÀY 2 - TV3]: Dựng Layout chung cho toàn bộ trang web
// [KIẾN THỨC TRỌNG TÂM - Nguyên lý DRY (Don't Repeat Yourself)]:
// Gom Header và Footer vào 1 component cha duy nhất; các trang con chỉ cần render vào vị trí <Outlet />
export default function MainLayout() {
    return (
        // pb-16 md:pb-0: Tạo khoảng đệm đáy 64px trên điện thoại để thanh menu cố định không che mất Footer
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans pb-16 md:pb-0">
            <Header />

            {/* flex-1 giúp đẩy Footer luôn nằm sát đáy màn hình kể cả khi nội dung trang ngắn */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
