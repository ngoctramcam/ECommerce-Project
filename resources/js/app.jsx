import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

function Home() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-emerald-800">
                Chào mừng đến với Mộc Sách!
            </h1>
            <p className="mt-2 text-gray-600">
                Giao diện đã tích hợp thành công ReactJS Layout.
            </p>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}
