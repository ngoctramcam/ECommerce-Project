import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans pb-16 md:pb-0">
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
