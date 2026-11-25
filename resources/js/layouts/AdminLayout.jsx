import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

/* ---------- Icon (SVG inline, không cần cài thêm thư viện) ---------- */
const icons = {
    overview: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    category: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
    order: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    coupon: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM9 9h.01M15 15h.01M15 9l-6 6",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    menu: "M3 6h18M3 12h18M3 18h18",
    chevron: "M9 18l6-6-6-6",
    close: "M18 6 6 18M6 6l12 12",
};

function Icon({ name, className = "h-[18px] w-[18px]" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d={icons[name]} />
        </svg>
    );
}

/* ---------- Cấu hình menu (sửa đường dẫn cho khớp app.jsx của bạn) ---------- */
const MENU = [
    { to: "/admin", label: "Tổng quan", icon: "overview", end: true },
    { to: "/admin/categories", label: "Quản lý Danh mục", icon: "category" },
    { to: "/admin/books", label: "Quản lý Sách", icon: "book" },
    { to: "/admin/orders", label: "Quản lý Đơn hàng", icon: "order" },
    { to: "/admin/users", label: "Quản lý Người dùng", icon: "users" },
    { to: "/admin/vouchers", label: "Mã giảm giá", icon: "coupon" },
];

/* ---------- Lấy thông tin admin đang đăng nhập ---------- */
function getCurrentUser() {
    try {
        const u = JSON.parse(localStorage.getItem("user"));
        if (u)
            return {
                name: u.full_name || u.name || "Quản trị viên",
                role: "Quản trị viên",
            };
    } catch (e) {
        /* bỏ qua, dùng giá trị mặc định */
    }
    return { name: "Quản trị viên", role: "Quản trị viên" };
}

/* ---------- Sidebar ---------- */
function AdminSidebar({ user, onNavigate, onLogout }) {
    return (
        <div className="flex h-full flex-col bg-gray-50">
            <div className="flex items-center gap-2 px-5 pb-6 pt-6">
                <Icon name="book" className="h-6 w-6 text-gray-600" />
                <div className="leading-tight">
                    <p className="text-xl font-semibold text-gray-600">
                        Mộc Sách
                    </p>
                    <p className="text-[10px] text-gray-400">QUẢN TRỊ</p>
                </div>
            </div>

            <p className="px-5 pb-2 text-[10px] font-medium text-gray-400">
                KHÔNG GIAN QUẢN LÝ
            </p>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                {MENU.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors " +
                            (isActive
                                ? "bg-gray-200 font-medium text-gray-900 before:absolute before:-left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-[3px] before:rounded-r before:bg-green-700"
                                : "text-gray-600 hover:bg-gray-100")
                        }
                    >
                        <Icon name={item.icon} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="mx-5 border-t border-gray-200 py-4">
                <p className="text-sm font-semibold text-gray-900">
                    {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
                <button
                    type="button"
                    onClick={onLogout}
                    className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-red-600"
                >
                    <Icon name="logout" />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

/* ---------- Header ---------- */
function AdminHeader({ title, user, onOpenMenu }) {
    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenMenu}
                    className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 md:hidden"
                    aria-label="Mở menu"
                >
                    <Icon name="menu" className="h-5 w-5" />
                </button>
                <h1 className="text-sm font-semibold text-gray-900 md:text-base">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right leading-tight">
                    <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-gray-400" />
            </div>
        </header>
    );
}

/* ---------- Layout chính ---------- */
export default function AdminLayout() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const user = getCurrentUser();

    // Tiêu đề header lấy theo menu đang chọn
    const current =
        MENU.slice()
            .reverse()
            .find(
                (m) => pathname === m.to || pathname.startsWith(m.to + "/"),
            ) || MENU[0];

    const handleLogout = async () => {
        try {
            await window.axios.post(
                "/logout",
                {},
                { headers: { Accept: "application/json" } },
            );
        } catch (error) {
            console.error("Lỗi khi đăng xuất trên server:", error);
        } finally {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            window.location.href = "/login";
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar desktop */}
            <aside className="hidden w-60 shrink-0 border-r border-gray-200 md:block">
                <AdminSidebar user={user} onLogout={handleLogout} />
            </aside>

            {/* Sidebar mobile (drawer) */}
            {open && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpen(false)}
                    />
                    <aside className="relative h-full w-64 shadow-xl">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute right-3 top-3 z-10 rounded-md p-1 text-gray-500 hover:bg-gray-200"
                            aria-label="Đóng menu"
                        >
                            <Icon name="close" className="h-5 w-5" />
                        </button>
                        <AdminSidebar
                            user={user}
                            onNavigate={() => setOpen(false)}
                            onLogout={handleLogout}
                        />
                    </aside>
                </div>
            )}

            {/* Nội dung */}
            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader
                    title={current.label}
                    user={user}
                    onOpenMenu={() => setOpen(true)}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
