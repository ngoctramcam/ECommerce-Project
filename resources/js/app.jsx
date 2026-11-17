import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
//////////////////////////////////////////
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
//s Khai báo axios dùng chung và tự động đính kèm CSRF Token + chuẩn JSON cho toàn bộ trang
import axios from "axios";
//Của Vinh làm Phân trang admin
import UserList from "./pages/admin/UserList";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.headers.common["Accept"] = "application/json";

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

if (csrfToken) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}

function Home() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-emerald-800">
                Chào mừng đến với Mộc Sách!
            </h1>
            <p className="mt-2 text-gray-600">
                Giao diện đã tích hợp thành công ReactJS Layout.
            </p>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    {/* 👉 VỊ TRÍ 2: Gắn 2 route con vào bên trong MainLayout */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    {/* Của Vinh làm phân trang admin */}
                    <Route path="admin/users" element={<UserList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
