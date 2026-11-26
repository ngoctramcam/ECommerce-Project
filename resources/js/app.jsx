// AI-assisted [AI-02] - Cấu hình định tuyến SPA và bảo mật CSRF cho Axios
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProductReviewPage from "./pages/ProductReviewPage";
import AdminVouchersPage from "./pages/admin/AdminVouchersPage";

// Import các trang Admin đã có trong thư mục pages/admin
import AdminRoute from "./pages/admin/components/AdminRoute";
import CategoryManagement from "./pages/admin/CategoryManagement";
import BookManagement from "./pages/admin/BookManagement";
import UserList from "./pages/admin/UserList";
import AdminLayout from "./layouts/AdminLayout";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";


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

                    {/* <---TM-02: Khai báo đường dẫn "/books" cho trang danh sách & tìm kiếm sách (TM-02) */}
                    <Route path="books" element={<BookListPage />} />
                    {/* tm-03*/}
                    <Route path="/books/:id" element={<BookDetailPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />

                    {/* [NGÀY 4 - TV3 & TV2 - TM-04]: Trang Đăng nhập và Đăng ký */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    {/*TV4: Giao diện giỏ hàng */}
                    <Route path="cart" element={<CartPage />} />
                    <Route path="orders" element={<MyOrdersPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route
                        path="orders/:productId/review"
                        element={<ProductReviewPage />}
                    />
                </Route>

                {/* Giao diện Admin (tách riêng để không dính Header/Footer của trang bán hàng) */}

                <Route path="/admin" element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<AdminOrdersPage />} />
                        <Route
                            path="categories"
                            element={<CategoryManagement />}
                        />
                        <Route path="books" element={<BookManagement />} />
                        <Route path="users" element={<UserList />} />
                        <Route
                            path="orders"
                            element={<AdminOrdersPage/>}
                        />
                        <Route path="vouchers" element={<AdminVouchersPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
