import { useEffect, useState } from "react";

const ROLE_LABEL = { admin: "Admin", user: "Khách hàng" };
const STATUS_LABEL = { active: "Hoạt động", locked: "Bị khóa" };

const formatId = (id) => `ND${String(id).padStart(3, "0")}`;
const getXsrf = () => {
    const m = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : "";
};
/* ---------- Icon (SVG inline, không cần thư viện) ---------- */
const Icon = ({ children }) => (
    <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {children}
    </svg>
);
const SearchIcon = () => (
    <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </Icon>
);
const ChevronIcon = () => (
    <Icon>
        <path d="m6 9 6 6 6-6" />
    </Icon>
);
const EditIcon = () => (
    <Icon>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </Icon>
);
const LockIcon = () => (
    <Icon>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Icon>
);
const TrashIcon = () => (
    <Icon>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="m6 6 1 14h10l1-14" />
    </Icon>
);

/* ---------- Thành phần nhỏ ---------- */
function Select({ value, onChange, children }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-sm text-gray-600 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
                {children}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <ChevronIcon />
            </span>
        </div>
    );
}

function Badge({ tone, children }) {
    const tones = {
        gray: "bg-gray-100 text-gray-500",
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-700",
        red: "bg-red-50 text-red-600",
    };
    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
        >
            {children}
        </span>
    );
}

function IconButton({ label, onClick, danger, disabled, children }) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className={`flex h-8 w-8 items-center justify-center rounded-md border text-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                danger
                    ? "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                    : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
        >
            {children}
        </button>
    );
}

/* Tạo dãy số trang: 1 2 3 … n */
function pageNumbers(current, last) {
    if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);
    const set = new Set([1, last, current, current - 1, current + 1]);
    const list = [...set]
        .filter((p) => p >= 1 && p <= last)
        .sort((a, b) => a - b);
    const out = [];
    list.forEach((p, i) => {
        if (i > 0 && p - list[i - 1] > 1) out.push("...");
        out.push(p);
    });
    return out;
}

/* ---------- Trang chính ---------- */
export default function UserList() {
    const [keyword, setKeyword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({ data: [], last_page: 1, total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            setLoading(true);
            setError("");
            try {
                // Gửi tham số qua query string; server dùng prepared statement
                const qs = new URLSearchParams({
                    page: String(page),
                    keyword,
                    role,
                    status,
                });
                const res = await fetch(`/admin/users?${qs}`, {
                    headers: { Accept: "application/json" },
                    credentials: "same-origin",
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setResult(await res.json());
            } catch (e) {
                if (e.name !== "AbortError")
                    setError("Không tải được danh sách người dùng");
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [keyword, role, status, page, reload]);

    // Đổi bộ lọc thì quay về trang 1
    const onFilter = (setter) => (e) => {
        setter(e.target.value);
        setPage(1);
    };
    const handleToggleLock = async (user) => {
        const action = user.status === "active" ? "khóa" : "mở khóa";
        if (
            !window.confirm(
                `Bạn có chắc muốn ${action} tài khoản ${user.email}?`,
            )
        )
            return;
        try {
            const res = await fetch(
                `/admin/users/${user.user_id}/toggle-lock`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "X-XSRF-TOKEN": getXsrf(),
                    },
                    credentials: "same-origin",
                },
            );
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.message || `HTTP ${res.status}`);
            setReload((n) => n + 1);
        } catch (err) {
            alert(err.message || "Có lỗi xảy ra");
        }
    };

    const lastPage = result.last_page || 1;

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-8">
            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Quản lý Người dùng
            </h1>
            <p className="mt-1 text-sm text-gray-500">
                Quản lý tài khoản, vai trò và quyền truy cập.
            </p>

            {/* Thanh tìm kiếm + bộ lọc */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_190px_190px_190px]">
                <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <SearchIcon />
                    </span>
                    <input
                        type="search"
                        placeholder="Tìm theo tên, email, SĐT..."
                        value={keyword}
                        onChange={onFilter(setKeyword)}
                        className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                </div>

                <Select value={role} onChange={onFilter(setRole)}>
                    <option value="">Tất cả vai trò</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Khách hàng</option>
                </Select>

                <Select value={status} onChange={onFilter(setStatus)}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="locked">Bị khóa</option>
                </Select>

                <button
                    type="button"
                    className="h-11 rounded-lg bg-emerald-700 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                    + Thêm người dùng
                </button>
            </div>

            {/* Thẻ danh sách */}
            <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <header className="flex items-center gap-3 px-6 py-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Danh sách người dùng
                    </h2>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {result.total ?? result.data.length} tài khoản
                    </span>
                    {loading && (
                        <span className="text-xs text-gray-400">
                            Đang tải ...
                        </span>
                    )}
                </header>

                {error && (
                    <p className="mx-6 mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[960px] text-left text-sm">
                        <thead className="bg-gray-50 text-xs font-medium text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Mã</th>
                                <th className="px-3 py-4">Họ và tên</th>
                                <th className="px-3 py-4">Email</th>
                                <th className="px-3 py-4">Số điện thoại</th>
                                <th className="px-3 py-4">Địa chỉ</th>
                                <th className="px-3 py-4">Vai trò</th>
                                <th className="px-3 py-4">Trạng thái</th>
                                <th className="px-3 py-4">Ngày tạo</th>
                                <th className="px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.data.map((u, i) => (
                                <tr
                                    key={u.user_id}
                                    className={
                                        i % 2 === 1 ? "bg-gray-50/70" : ""
                                    }
                                >
                                    <td className="px-6 py-6 text-xs font-medium text-emerald-700">
                                        {formatId(u.user_id)}
                                    </td>
                                    <td className="px-3 py-6 text-xs font-semibold text-gray-900">
                                        {u.full_name}
                                    </td>
                                    <td className="px-3 py-6 text-xs text-gray-800">
                                        {u.email}
                                    </td>
                                    <td className="px-3 py-6 text-xs text-gray-800">
                                        {u.phone}
                                    </td>
                                    <td className="max-w-[170px] px-3 py-6 text-xs text-gray-800">
                                        {u.address}
                                    </td>
                                    <td className="px-3 py-6">
                                        <Badge
                                            tone={
                                                u.role === "admin"
                                                    ? "blue"
                                                    : "gray"
                                            }
                                        >
                                            {ROLE_LABEL[u.role] ?? u.role}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-6">
                                        <Badge
                                            tone={
                                                u.status === "active"
                                                    ? "green"
                                                    : "red"
                                            }
                                        >
                                            {STATUS_LABEL[u.status] ?? u.status}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-6 text-xs text-gray-800">
                                        {new Date(
                                            u.created_at,
                                        ).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex gap-2">
                                            <IconButton
                                                label={
                                                    u.status === "active"
                                                        ? "Khóa tài khoản"
                                                        : "Mở khóa tài khoản"
                                                }
                                                disabled={u.role === "admin"}
                                                onClick={() =>
                                                    handleToggleLock(u)
                                                }
                                            >
                                                <LockIcon />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {!loading && result.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="p-8 text-center text-sm text-gray-500"
                                    >
                                        Không có người dùng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <footer className="flex justify-end gap-2 border-t border-gray-100 px-6 py-5">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-md border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Trước
                    </button>

                    {pageNumbers(page, lastPage).map((p, i) =>
                        p === "..." ? (
                            <span
                                key={`gap-${i}`}
                                className="px-1 py-1.5 text-xs text-gray-400"
                            >
                                …
                            </span>
                        ) : (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPage(p)}
                                aria-current={p === page ? "page" : undefined}
                                className={`min-w-[32px] rounded-md border px-2 py-1.5 text-xs font-medium ${
                                    p === page
                                        ? "border-emerald-700 bg-emerald-700 text-white"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {p}
                            </button>
                        ),
                    )}

                    <button
                        type="button"
                        disabled={page >= lastPage}
                        onClick={() => setPage(page + 1)}
                        className="rounded-md border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Sau
                    </button>
                </footer>
            </section>
        </div>
    );
}
