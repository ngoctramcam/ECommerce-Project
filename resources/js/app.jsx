// AI-assisted [AI-02] - Cấu hình định tuyến SPA và bảo mật CSRF cho Axios
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import axios from "axios";

// [KIẾN THỨC TRỌNG TÂM - Tách lớp Client-Server & Bảo mật NFR-01]:
// Frontend React giao tiếp với Backend Laravel qua HTTP/JSON, không truy vấn trực tiếp CSDL.
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Accept"] = "application/json";

// Đọc mã CSRF Token từ thẻ <meta> của Laravel và gắn tự động vào mọi request POST/PUT/DELETE
// Giúp chống tấn công giả mạo yêu cầu liên trang (CSRF - yêu cầu bắt buộc NFR-01)
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

if (csrfToken) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}

export default function App() {
    return (
        // [NGÀY 1 - TV3]: Cấu hình điều hướng phía Client (React Router)
        <BrowserRouter>
            <Routes>
                {/* Route cha dùng MainLayout bọc ngoài để tái sử dụng Header & Footer */}
                <Route path="/" element={<MainLayout />}>
                    {/* [NGÀY 3 - TV3 - TM-01]: Trang chủ hiển thị mặc định khi vào "/" */}
                    <Route index element={<HomePage />} />

                    {/* [NGÀY 4 - TV3 & TV2 - TM-04]: Trang Đăng nhập và Đăng ký */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    {/*TV3: Giao diện giỏ hàng */}
                    <Route path="cart" element={<CartPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
