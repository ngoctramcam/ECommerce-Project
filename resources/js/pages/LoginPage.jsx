import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    // [CODE GỐC CỦA TV3]: State lưu email và mật khẩu người dùng nhập
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    //  State lưu lỗi từng trường (422) và lỗi chung (401) từ Server trả về
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Cập nhật dữ liệu khi gõ và tự động xóa thông báo lỗi cũ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        if (generalError) {
            setGeneralError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setGeneralError("");

        try {
            // Gửi email và password sang route POST /login -> gọi hàm login() trong AuthController của TV2
            const response = await window.axios.post("/login", formData);

            // NHẬN DỮ LIỆU USER THẬT TỪ BACKEND TV2:
            // Lưu object user thật từ MySQL (gồm id, name, email, role) do TV2 trả về vào localStorage để Header hiển thị tên thật
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // ĐIỀU HƯỚNG THEO PHÂN QUYỀN CỦA TV2]:
            // Chuyển trang theo đường dẫn redirect mà TV2 trả về (nếu role === 'admin' thì vào '/admin', khách hàng thì về '/')
            window.location.href = response.data.redirect || "/";
        } catch (error) {
            if (error.response?.status === 422) {
                // Hứng lỗi validate từ hàm $request->validate() của TV2 (bỏ trống email/mật khẩu, sai định dạng email)
                setErrors(error.response.data.errors || {});
            } else if (error.response?.status === 401) {
                // Hứng lỗi từ AuthService của TV2 (sai email, sai mật khẩu hoặc tài khoản bị khóa) -> hiện lên khung cảnh báo đỏ
                setGeneralError(error.response.data.message);
            } else {
                setGeneralError(
                    error.response?.data?.message ||
                        "Đăng nhập thất bại. Vui lòng thử lại.",
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Đăng nhập
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Chào mừng bạn quay trở lại Mộc Sách
                    </p>
                </div>

                {/* Hiển thị lỗi chung từ Server */}
                {generalError && (
                    <div
                        role="alert"
                        className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
                    >
                        {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="login-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="nhapemail@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.email
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label
                            htmlFor="login-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.password
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition cursor-pointer"
                    >
                        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-emerald-700 hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
