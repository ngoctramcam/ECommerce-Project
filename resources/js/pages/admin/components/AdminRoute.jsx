// AdminRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const [status, setStatus] = useState("loading"); // loading | ok | denied

    useEffect(() => {
        fetch("/auth/me", {
            credentials: "same-origin",
            headers: { Accept: "application/json" },
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) =>
                setStatus(data?.user?.role === "admin" ? "ok" : "denied"),
            )
            .catch(() => setStatus("denied"));
    }, []);

    if (status === "loading") return null;
    if (status === "denied") return <Navigate to="/" replace />;
    return <Outlet />;
}