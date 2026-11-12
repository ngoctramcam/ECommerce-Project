// ============================================================================
// 👉 [CHỖ SỬA 1]: Thêm { useState, useEffect } vào dòng import đầu tiên
// Giải thích: Dùng để lưu tên user và tự động kiểm tra trạng thái khi tải trang
// ============================================================================
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

export default function Header() {
    // ========================================================================
    // 👉 [CHỖ THÊM MỚI 2]: Thêm toàn bộ khối logic từ đây đến trước chữ return
    // ========================================================================

    // 1. Tạo biến 'user' để chứa thông tin người dùng (mặc định là null = chưa đăng nhập)
    const [user, setUser] = useState(null);

    // 2. Tự động chạy 1 lần ngay khi Header hiện lên màn hình
    useEffect(() => {
        try {
            // Lấy dữ liệu 'user' mà trang LoginPage đã lưu vào trình duyệt
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                // Giải mã chuỗi JSON thành object (vd: { name: "tram", email: "..." })
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            localStorage.removeItem("user");
        }
    }, []);

    // 3. Hàm chạy khi người dùng bấm vào nút "Đăng xuất"
    const handleLogout = async () => {
        // [Ghi chú sau này]: Khi TV2 xong API đăng xuất thì mở comment dòng dưới:
        // await axios.post("/api/logout");

        // Xóa sạch thông tin đăng nhập khỏi trình duyệt
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Đặt lại user về null và chuyển về trang đăng nhập
        setUser(null);
        window.location.href = "/login";
    };
    // ==================== HẾT KHỐI THÊM MỚI 2 ====================

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            {/* 1. Topbar thông báo (GIỮ NGUYÊN CODE CŨ) */}
            <div className="bg-emerald-800 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="truncate">
                        🚚 Sách thật, trí thức thật • Miễn phí giao từ 299k
                    </span>
                    <span className="shrink-0 hidden xs:inline">
                        Hotline:{" "}
                        <strong className="text-emerald-200">1900 6868</strong>
                    </span>
                </div>
            </div>

            {/* 2. Thanh Header chính (Logo, Tìm kiếm, Tài khoản, Giỏ hàng) */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-6">
                {/* Logo (GIỮ NGUYÊN CODE CŨ) */}
                <Link to="/" className="flex flex-col shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-emerald-800 tracking-tight">
                        Mộc Sách
                    </span>
                    <span className="text-[10px] text-gray-400 -mt-1 font-medium hidden sm:inline">
                        Mở sách, mở thế giới
                    </span>
                </Link>

                {/* Ô tìm kiếm (GIỮ NGUYÊN CODE CŨ) */}
                <div className="flex-1 max-w-xl relative">
                    <input
                        type="text"
                        placeholder="Tìm sách, tác giả..."
                        className="w-full bg-gray-100 border border-gray-200 rounded-full py-1.5 sm:py-2 pl-3 sm:pl-4 pr-9 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700 text-xs sm:text-sm">
                        🔍
                    </button>
                </div>

                {/* Nút Tài khoản & Giỏ hàng */}
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                    {/* ========================================================
                        👉 [CHỖ THAY THẾ 3]: Xóa đoạn <Link to="/login">Tài khoản</Link> cũ
                        và thay bằng cấu trúc điều kiện: {user ? (Đã ĐN) : (Chưa ĐN)}
                       ======================================================== */}
                    {user ? (
                        // TRƯỜNG HỢP A: Biến 'user' có dữ liệu (ĐÃ ĐĂNG NHẬP)
                        // -> Hiển thị Tên người dùng + Nút Đăng xuất
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                                <span>👤</span>
                                {/* user.name lấy tên người dùng; truncate giúp cắt gọn nếu tên quá dài */}
                                <span className="max-w-[85px] sm:max-w-[140px] truncate font-semibold">
                                    {user.name}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        // TRƯỜNG HỢP B: Biến 'user' là null (CHƯA ĐĂNG NHẬP)
                        // -> Hiển thị rõ cả 2 nút "Đăng nhập" và "Đăng ký" để khách dễ bấm
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <Link
                                to="/login"
                                className="text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-50 border border-emerald-600 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                to="/register"
                                className="text-xs sm:text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors"
                            >
                                Đăng ký
                            </Link>
                        </div>
                    )}
                    {/* ==================== HẾT CHỖ THAY THẾ 3 ==================== */}

                    {/* Nút Giỏ hàng (GIỮ NGUYÊN CODE CŨ) */}
                    <Link
                        to="/cart"
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-100 transition-colors"
                    >
                        <span>🛒</span>
                        <span className="hidden md:inline">Giỏ hàng</span>
                        <span className="bg-emerald-600 text-white text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold">
                            3
                        </span>
                    </Link>
                </div>
            </div>

            {/* 3. Gọi Component CategoryMenu (GIỮ NGUYÊN CODE CŨ) */}
            <CategoryMenu />
        </header>
    );
}
