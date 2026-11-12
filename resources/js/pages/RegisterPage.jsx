import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            // --- GIẢ LẬP KIỂM TRA DỮ LIỆU TỪ SERVER ---
            await new Promise((resolve) => setTimeout(resolve, 400));
            const serverErrors = {};

            if (!formData.name.trim()) {
                serverErrors.name = "Họ và tên không được để trống.";
            }
            if (!formData.email.trim()) {
                serverErrors.email = "Email không được để trống.";
            } else if (formData.email === "admin@mocsach.vn") {
                serverErrors.email =
                    "Email này đã được đăng ký trong hệ thống.";
            }
            if (formData.password.length < 6) {
                serverErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
            }
            if (formData.password !== formData.password_confirmation) {
                serverErrors.password_confirmation =
                    "Mật khẩu xác nhận không khớp.";
            }

            if (Object.keys(serverErrors).length > 0) {
                setErrors(serverErrors);
                setIsLoading(false);
                return;
            }

            alert("Đăng ký tài khoản thành công!");
            // --- KẾT THÚC GIẢ LẬP ---
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setGeneralError("Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[75vh] flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Đăng ký tài khoản
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Tạo tài khoản thành viên Mộc Sách miễn phí
                    </p>
                </div>

                {generalError && (
                    <div
                        role="alert"
                        className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
                    >
                        {generalError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Họ và tên */}
                    <div>
                        <label
                            htmlFor="register-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="register-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nguyễn Văn A"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.name
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="register-email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="nguyenvana@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.email
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label
                            htmlFor="register-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Tối thiểu 6 ký tự"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.password
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div>
                        <label
                            htmlFor="register-password-confirm"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Xác nhận mật khẩu{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="register-password-confirm"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${
                                errors.password_confirmation
                                    ? "border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            }`}
                        />
                        {errors.password_confirmation && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-semibold rounded-xl text-sm transition cursor-pointer mt-2"
                    >
                        {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-emerald-700 hover:underline"
                    >
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}
