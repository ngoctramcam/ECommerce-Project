import React from "react";
import { Link, useNavigate } from "react-router-dom";

// [NGÀY 2 - TV3]: Dựng Footer dùng chung, chia 3 cột trên Desktop (md:grid-cols-3) và xếp dọc trên Mobile (grid-cols-1)
export default function Footer() {
    const navigate = useNavigate();

    const handleGoToCategories = () => {
        navigate("/");
        setTimeout(() => {
            const section = document.getElementById("category-books-section");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1: Thông tin thương hiệu */}
                    <div>
                        <Link
                            to="/"
                            className="text-lg sm:text-xl font-bold text-emerald-700 tracking-tight"
                        >
                            Mộc Sách
                        </Link>
                        <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                            Nuôi dưỡng tâm hồn qua từng trang sách.
                        </p>
                    </div>

                    {/* Cột 2: Khám phá */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">
                            Khám phá
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-gray-500 list-none m-0 p-0">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-emerald-700 transition-colors"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={handleGoToCategories}
                                    className="hover:text-emerald-700 transition-colors cursor-pointer"
                                >
                                    Danh mục sách
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Tài khoản của bạn */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">
                            Tài khoản của bạn
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-gray-500 list-none m-0 p-0">
                            <li>
                                <Link
                                    to="/cart"
                                    className="hover:text-emerald-700 transition-colors"
                                >
                                    Giỏ hàng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/orders"
                                    className="hover:text-emerald-700 transition-colors"
                                >
                                    Đơn hàng của tôi
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
