//// AI-assisted [AI-04]
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const [status, setStatus] = useState("loading"); // 'loading' | 'allowed' | 'denied'

    useEffect(() => {
        window.axios
            .get("/auth/me", {
                headers: { Accept: "application/json" },
            })
            .then((res) => {
                if (
                    res.data?.authenticated &&
                    res.data?.user?.role === "admin"
                ) {
                    setStatus("allowed");
                } else {
                    setStatus("denied");
                }
            })
            .catch(() => {
                setStatus("denied");
            });
    }, []);

    if (status === "loading") {
        return null;
    }

    if (status === "denied") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
