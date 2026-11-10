import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-8 border-t border-slate-800 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Cột 1: Giới thiệu thương hiệu */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        📚 Mộc Sách
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                        Mỗi cuốn sách, một thế giới mới. Đồng hành và lan tỏa
                        thói quen đọc sách cùng cộng đồng người đọc Việt Nam mỗi
                        ngày.
                    </p>
                    <div className="flex space-x-3 text-lg text-slate-400">
                        <span className="cursor-pointer hover:text-emerald-400 transition-colors">
                            🌐
                        </span>
                        <span className="cursor-pointer hover:text-emerald-400 transition-colors">
                            📘
                        </span>
                        <span className="cursor-pointer hover:text-emerald-400 transition-colors">
                            📸
                        </span>
                    </div>
                </div>

                {/* Cột 2: Danh mục nổi bật */}
                <div>
                    <h4 className="text-white font-semibold mb-3">
                        Danh mục sách
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li>
                            <Link
                                to="/categories"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Văn học Việt Nam
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Kinh tế & Quản trị
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Kỹ năng sống
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Sách thiếu nhi
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 3: Hỗ trợ khách hàng */}
                <div>
                    <h4 className="text-white font-semibold mb-3">
                        Hỗ trợ khách hàng
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li>
                            <Link
                                to="#"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Hướng dẫn mua hàng
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Chính sách đổi trả
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Chính sách vận chuyển
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                Phương thức thanh toán
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 4: Thông tin liên hệ */}
                <div>
                    <h4 className="text-white font-semibold mb-3">
                        Thông tin liên hệ
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-400">
                        <li className="flex items-center gap-2">
                            <span>📞</span> Hotline:{" "}
                            <span className="text-white font-medium">
                                1900 6868
                            </span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>✉️</span> Email: cskh@mocsach.vn
                        </li>
                        <li className="flex items-start gap-2">
                            <span>📍</span> 12 Nguyễn Văn Bình, P. Bến Nghé,
                            Q.1, TP. HCM
                        </li>
                    </ul>
                </div>
            </div>

            {/* Dòng bản quyền (Copyright) */}
            <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
                © 2026 Mộc Sách. Bản quyền thuộc về Dự án Mộc Sách.
            </div>
        </footer>
    );
}
