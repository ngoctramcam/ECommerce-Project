import { useEffect, useState } from "react";
export default function UserList() {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState({ data: [], last_page: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            setLoading(true);
            setError("");
            try {
                const qs = new URLSearchParams({ page: String(page), keyword });
                const res = await fetch(`/users?${qs}`, {
                    headers: { Accept: "application/json" },
                    signal: controller.signal,
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
    }, [keyword, page]);
    return (
        <div className="">
            <h1>Quản lý người dùng</h1>
            <input
                type="search"
                placeholder="Tìm theo email..."
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                    setPage(1);
                }}
                className=""
            />
            {error && <p>{error}</p>}
            {loading && <p>Đang tải ...</p>}
            <div className="">
                <table className="">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.data.map((u) => (
                            <tr key={u.user_id} className="border-b">
                                <td>{u.user_id}</td>
                                <td>{u.full_name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.role}</td>
                                <td>{u.status}</td>
                                <td>
                                    {new Date(u.created_at).toLocaleDateString(
                                        "vi-VN",
                                    )}
                                </td>
                            </tr>
                        ))}
                        {!loading && result.data.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    Không có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded border px-3 py-1 disabled:opacity-50"
                >
                    Trước
                </button>
                <span>
                    Trang {page}/{result.last_page}
                </span>
                <button
                    disabled={page >= result.last_page}
                    onClick={() => setPage(page + 1)}
                    className="rounded border px-3 py-1 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    );
}
