import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SHOW_PASSWORD_FORM = false;

const PHONE_REGEX = /^(0|\+84)\d{9}$/;

const inputClass =
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 " +
    "placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 " +
    "focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

function Field({ label, id, error, className = "", children }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1.5 block text-sm text-slate-700">
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

function Card({ title, children }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white">
            <h2 className="border-b border-slate-200 px-4 py-4 text-lg font-semibold text-slate-900 sm:px-6">
                {title}
            </h2>
            {children}
        </section>
    );
}

function Message({ message }) {
    if (!message) return null;
    const color =
        message.type === "success"
            ? "bg-emerald-50 text-emerald-800"
            : "bg-red-50 text-red-700";
    return (
        <p
            role="status"
            className={`mt-3 rounded-md px-3 py-2 text-sm ${color}`}
        >
            {message.text}
        </p>
    );
}

// Lấy lỗi đầu tiên của từng trường từ phản hồi 422 của Laravel
function pickServerErrors(err) {
    const raw = err.response?.data?.errors ?? {};
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, v[0]]));
}

export default function ProfilePage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState(""); // tên hiển thị ở sidebar
    const [form, setForm] = useState({ full_name: "", phone: "", address: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
    const [pwErrors, setPwErrors] = useState({});
    const [pwMessage, setPwMessage] = useState(null);
    const [pwSaving, setPwSaving] = useState(false);

    useEffect(() => {
        let cancelled = false;
        axios
            .get("/api/profile")
            .then((res) => {
                if (cancelled) return;
                // Chịu được { name... } | { user: {...} } | { data: {...} }
                const data = res.data?.user ?? res.data?.data ?? res.data;
                if (!data || typeof data !== "object") {
                    setMessage({
                        type: "error",
                        text: "API /api/profile không trả về dữ liệu JSON hợp lệ.",
                    });
                    return;
                }
                const displayName =
                    data.full_name ?? data.fullName ?? data.name ?? "";
                setEmail(data.email ?? "");
                setFullName(displayName);
                setForm({
                    full_name: displayName,
                    phone: data.phone ?? "",
                    address: data.address ?? "",
                });
            })
            .catch((err) => {
                if (cancelled) return;
                if (err.response?.status === 401) navigate("/login");
                else
                    setMessage({
                        type: "error",
                        text: "Không tải được hồ sơ. Vui lòng tải lại trang.",
                    });
            })
            .finally(() => !cancelled && setLoading(false));
        return () => {
            cancelled = true;
        };
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((er) => ({ ...er, [name]: undefined }));
    };

    const validate = () => {
        const er = {};
        if (!form.full_name.trim()) er.full_name = "Vui lòng nhập họ và tên.";
        else if (form.full_name.trim().length > 100)
            er.full_name = "Họ và tên tối đa 100 ký tự.";

        if (!form.phone.trim()) er.phone = "Vui lòng nhập số điện thoại.";
        else if (!PHONE_REGEX.test(form.phone.replace(/\s/g, "")))
            er.phone = "Số điện thoại không hợp lệ (ví dụ 0901234567).";

        if (!form.address.trim())
            er.address = "Vui lòng nhập địa chỉ giao hàng.";
        else if (form.address.trim().length > 255)
            er.address = "Địa chỉ tối đa 255 ký tự.";
        return er;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage(null);
        const er = validate();
        setErrors(er);
        if (Object.keys(er).length) return;

        setSaving(true);
        try {
            const payload = {
                full_name: form.full_name.trim(),
                phone: form.phone.replace(/\s/g, ""),
                address: form.address.trim(),
            };
            const { data } = await axios.put("/api/profile", payload);
            setFullName(data?.full_name ?? payload.full_name);
            setMessage({ type: "success", text: "Đã lưu thay đổi." });
        } catch (err) {
            if (err.response?.status === 422) setErrors(pickServerErrors(err));
            else
                setMessage({
                    type: "error",
                    text: "Không lưu được. Vui lòng thử lại.",
                });
        } finally {
            setSaving(false);
        }
    };

    // ----- Đổi mật khẩu (có trong thiết kế; bỏ khối này nếu TM-08 chưa cần) -----
    const handlePwChange = (e) => {
        const { name, value } = e.target;
        setPw((p) => ({ ...p, [name]: value }));
        setPwErrors((er) => ({ ...er, [name]: undefined }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPwMessage(null);
        const er = {};
        if (!pw.current) er.current = "Vui lòng nhập mật khẩu hiện tại.";
        if (pw.next.length < 8) er.next = "Mật khẩu mới tối thiểu 8 ký tự.";
        if (pw.confirm !== pw.next)
            er.confirm = "Mật khẩu xác nhận không khớp.";
        setPwErrors(er);
        if (Object.keys(er).length) return;

        setPwSaving(true);
        try {
            await axios.put("/api/profile/password", {
                current_password: pw.current,
                password: pw.next,
                password_confirmation: pw.confirm,
            });
            setPw({ current: "", next: "", confirm: "" });
            setPwMessage({ type: "success", text: "Đã cập nhật mật khẩu." });
        } catch (err) {
            if (err.response?.status === 422) {
                const s = pickServerErrors(err);
                setPwErrors({
                    current: s.current_password,
                    next: s.password,
                    confirm: s.password_confirmation,
                });
            } else
                setPwMessage({
                    type: "error",
                    text: "Không cập nhật được. Vui lòng thử lại.",
                });
        } finally {
            setPwSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
        } finally {
            navigate("/login");
        }
    };

    const tabClass = ({ isActive }) =>
        "block rounded-md px-3 py-2.5 text-sm font-medium text-emerald-800 bg-emerald-50 " +
        "max-md:rounded-full max-md:py-2.5 max-md:text-center max-md:text-white " +
        (isActive ? "max-md:bg-emerald-700 " : "max-md:bg-emerald-700/70 ") +
        (isActive ? "ring-1 ring-emerald-700/20 " : "");

    return (
        <div className="w-full pb-6 pt-2">
            {/* Breadcrumb – chỉ hiện trên màn hình lớn */}
            <nav
                aria-label="Breadcrumb"
                className="mb-2 hidden text-xs text-slate-500 md:block"
            >
                <Link to="/" className="hover:text-emerald-700">
                    Trang chủ
                </Link>
                <span className="mx-2">/</span>
                <span>Tài khoản</span>
                <span className="mx-2">/</span>
                <span>Hồ sơ cá nhân</span>
            </nav>

            <h1 className="mb-4 text-2xl font-bold text-slate-900 md:mb-6 md:text-3xl">
                Hồ sơ cá nhân
            </h1>

            <div className="grid gap-6 md:grid-cols-[16rem_minmax(0,1fr)] md:items-start">
                {/* Điều hướng tài khoản: sidebar trên desktop, 2 nút trên điện thoại */}
                <aside className="md:rounded-lg md:border md:border-slate-200 md:bg-white">
                    <div className="hidden border-b border-slate-200 p-4 md:block">
                        <p className="truncate font-semibold text-slate-900">
                            {fullName || "—"}
                        </p>
                        <p className="truncate text-sm text-slate-500">
                            {email}
                        </p>
                    </div>
                    <nav className="grid grid-cols-2 gap-3 md:flex md:flex-col md:gap-2 md:p-3">
                        <NavLink to="/profile" className={tabClass}>
                            Hồ sơ cá nhân
                        </NavLink>
                        <NavLink to="/orders" className={tabClass}>
                            Đơn hàng của tôi
                        </NavLink>
                    </nav>
                </aside>

                <div className="space-y-6">
                    {/* ---------- Thông tin cá nhân ---------- */}
                    <Card title="Thông tin cá nhân">
                        <form onSubmit={handleSave} noValidate>
                            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
                                <Field
                                    label="Họ và tên"
                                    id="name"
                                    error={errors.full_name}
                                >
                                    <input
                                        id="name"
                                        name="full_name"
                                        type="text"
                                        autoComplete="name"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-invalid={!!errors.full_name}
                                        aria-describedby={
                                            errors.full_name
                                                ? "name-error"
                                                : undefined
                                        }
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Email" id="email">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        disabled
                                        readOnly
                                        className={inputClass}
                                    />
                                </Field>

                                <Field
                                    label="Số điện thoại"
                                    id="phone"
                                    error={errors.phone}
                                >
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={
                                            errors.phone
                                                ? "phone-error"
                                                : undefined
                                        }
                                        className={inputClass}
                                    />
                                </Field>

                                <Field
                                    label="Địa chỉ"
                                    id="address"
                                    error={errors.address}
                                >
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        autoComplete="street-address"
                                        value={form.address}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-invalid={!!errors.address}
                                        aria-describedby={
                                            errors.address
                                                ? "address-error"
                                                : undefined
                                        }
                                        className={inputClass}
                                    />
                                </Field>
                            </div>

                            <div className="border-t border-slate-200 p-4 sm:px-6">
                                <button
                                    type="submit"
                                    disabled={saving || loading}
                                    className="w-full rounded-md bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
                                >
                                    {saving ? "Đang lưu…" : "Lưu thay đổi"}
                                </button>
                                <Message message={message} />
                            </div>
                        </form>
                    </Card>

                    {/* ---------- Đổi mật khẩu ---------- */}
                    {SHOW_PASSWORD_FORM && (
                        <Card title="Đổi mật khẩu">
                            <form
                                onSubmit={handlePasswordSubmit}
                                noValidate
                                className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6"
                            >
                                <Field
                                    label="Mật khẩu hiện tại"
                                    id="current"
                                    error={pwErrors.current}
                                    className="sm:col-span-2"
                                >
                                    <input
                                        id="current"
                                        name="current"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={pw.current}
                                        onChange={handlePwChange}
                                        className={inputClass}
                                    />
                                </Field>
                                <Field
                                    label="Mật khẩu mới"
                                    id="next"
                                    error={pwErrors.next}
                                >
                                    <input
                                        id="next"
                                        name="next"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={pw.next}
                                        onChange={handlePwChange}
                                        className={inputClass}
                                    />
                                </Field>
                                <Field
                                    label="Xác nhận mật khẩu mới"
                                    id="confirm"
                                    error={pwErrors.confirm}
                                >
                                    <input
                                        id="confirm"
                                        name="confirm"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Nhập lại mật khẩu mới"
                                        value={pw.confirm}
                                        onChange={handlePwChange}
                                        className={inputClass}
                                    />
                                </Field>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={pwSaving}
                                        className="w-full rounded-md border border-emerald-700 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
                                    >
                                        {pwSaving
                                            ? "Đang cập nhật…"
                                            : "Cập nhật mật khẩu"}
                                    </button>
                                    <Message message={pwMessage} />
                                </div>
                            </form>
                        </Card>
                    )}

                    {/* Đăng xuất – chỉ hiện trên điện thoại (desktop đã có ở menu Tài khoản) */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-md border border-red-500 bg-white px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 md:hidden"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}
