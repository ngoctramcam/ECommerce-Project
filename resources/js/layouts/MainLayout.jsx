import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// [NGÀY 1, 2 & NGÀY 9 - TV3]: Layout khung dùng chung cho toàn bộ các trang khách hàng
//: gom Header & Footer vào 1 nơi duy nhất
export default function MainLayout() {
    return (
        /**
         * Thẻ bọc toàn bộ giao diện (Wrapper):
         * - min-h-screen: Chiều cao tối thiểu bằng 100% chiều cao màn hình thiết bị.
         * - w-full: Ép chiều rộng khung trang bằng đúng 100% khung nhìn (360px trên mobile).
         * - overflow-x-hidden: "Chốt chặn" chống tràn ngang — ngăn mọi phần tử con kéo giãn
         *   khung trang vượt quá 360px làm xuất hiện thanh cuộn ngang ở đáy màn hình.
         * - flex flex-col: Xếp 3 khối (Header, main, Footer) theo cột dọc từ trên xuống.
         * - pb-16 md:pb-0: Trên mobile (< 768px), chừa khoảng đệm đáy 64px (pb-16) để thanh
         *   menu cố định dưới đáy màn hình không che mất nội dung cuối của Footer; lên
         *   máy tính (md: >= 768px) thanh menu đáy ẩn đi nên trả về md:pb-0.
         */
        <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-gray-50 text-gray-800 font-sans pb-16 md:pb-0">
            {/* Thanh điều hướng dùng chung phía trên (và thanh menu 4 nút dưới đáy ở màn 360px) */}
            <Header />

            {/**
             * Khu vực chứa nội dung chính của từng trang con:
             * - flex-1: Tự động giãn chiếm toàn bộ khoảng trống ở giữa, giúp đẩy Footer
             *   luôn nằm sát đáy màn hình kể cả khi nội dung trang ngắn (VD: giỏ hàng trống).
             * - min-w-0: BẮT BUỘC có trong Flexbox để sửa lỗi tràn ngang 360px — mặc định thẻ
             *   con của flex có min-width: auto nên nếu lưới sách/bảng bên trong rộng hơn 360px,
             *   nó sẽ kéo phình cả thẻ <main>. Thêm min-w-0 ép <main> co gọn vừa khít 360px.
             * - max-w-7xl w-full mx-auto: Trên desktop giới hạn chiều rộng tối đa 1280px và
             *   căn giữa (mx-auto); trên màn nhỏ thì chiếm trọn 100% chiều rộng (w-full).
             * - px-3 sm:px-6 py-4: Tạo lề trái/phải 12px trên mobile 360px (tiết kiệm diện tích
             *   hiển thị) và 24px từ màn 640px trở lên (sm:px-6), đệm trên/dưới 16px (py-4).
             */}
            <main className="flex-1 min-w-0 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4">
                {/* Vị trí React Router tự động hiển thị 5 trang con (/, /books, /books/:id, /cart, /checkout) */}
                <Outlet />
            </main>

            {/* Chân trang dùng chung */}
            <Footer />
        </div>
    );
}
