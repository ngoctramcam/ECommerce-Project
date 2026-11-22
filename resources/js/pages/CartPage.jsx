import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; //CheckoutPage
// import { Link } from "react-router-dom";
import { Trash2, Ticket, Check, ArrowLeft } from "lucide-react";

const formatVND = (amount) => Number(amount || 0).toLocaleString("vi-VN") + "đ";

const getCsrfToken = () => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
};

export default function CartPage() {
    const navigate = useNavigate(); //CheckoutPage
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promoInput, setPromoInput] = useState("");
    const [appliedPromo, setAppliedPromo] = useState({
        code: "MOC15",
        discount: 15000,
    });

    // 1. Lấy dữ liệu giỏ hàng từ CSDL khi vào trang
    const fetchCartItems = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setItems([]);
            setLoading(false);
            return;
        }

        const user = JSON.parse(storedUser);

        try {
            setLoading(true);
            const res = await fetch(`/api/cart?user_id=${user.id}`, {
                credentials: "same-origin",
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                setItems([]);
                return;
            }

            const data = await res.json();
            const list = Array.isArray(data) ? data : data.data || [];

            // Chuẩn hóa dữ liệu từ cart_items + product sang format giao diện
            const mapped = list.map((row) => {
                const prod = row.product || {};
                return {
                    id: row.cart_id, // ID của dòng cart_items
                    product_id: row.product_id,
                    title:
                        prod.title ||
                        prod.name ||
                        prod.product_name ||
                        "Sản phẩm",
                    author: prod.author || prod.publisher || "Nhà xuất bản",
                    price: Number(prod.price || prod.sale_price || 0),
                    quantity: Number(row.quantity || 1),
                    stock: Number(prod.stock ?? 999),
                    selected: true,
                    cover:
                        prod.cover ||
                        prod.image ||
                        prod.thumbnail ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200",
                };
            });

            setItems(mapped);
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const isAllSelected =
        items.length > 0 && items.every((item) => item.selected);

    const handleSelectAll = () => {
        const nextState = !isAllSelected;
        setItems((prev) =>
            prev.map((item) => ({ ...item, selected: nextState })),
        );
    };

    const handleSelectItem = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    // 2. Cập nhật số lượng (+ / -) xuống CSDL và kiểm tra tồn kho
    const handleUpdateQuantity = async (id, delta) => {
        const target = items.find((item) => item.id === id);
        if (!target) return;

        const newQty = target.quantity + delta;
        if (newQty < 1) return;

        if (newQty > target.stock) {
            alert(`Số lượng vượt tồn kho (còn lại ${target.stock} sản phẩm)`);
            return;
        }

        try {
            const res = await fetch(`/api/cart/${id}`, {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({ quantity: newQty }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Không thể cập nhật số lượng.");
                return;
            }

            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: newQty } : item,
                ),
            );
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Lỗi cập nhật số lượng:", error);
        }
    };

    // 3. Xóa sản phẩm khỏi giỏ hàng trong CSDL
    const handleRemoveItem = async (id) => {
        try {
            const res = await fetch(`/api/cart/${id}`, {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });

            if (!res.ok) {
                alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
                return;
            }

            setItems((prev) => prev.filter((item) => item.id !== id));
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Lỗi khi xóa khỏi giỏ hàng:", error);
        }
    };

    const handleApplyPromo = (e) => {
        e.preventDefault();
        const code = promoInput.trim().toUpperCase();
        if (!code) return;
        if (code === "MOC15") {
            setAppliedPromo({ code: "MOC15", discount: 15000 });
            setPromoInput("");
        } else {
            alert("Mã thử nghiệm hợp lệ là: MOC15");
        }
    };

    const selectedItems = items.filter((item) => item.selected);
    const subtotal = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const discountAmount =
        subtotal > 0 && appliedPromo ? appliedPromo.discount : 0;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    //f3-xử lý sự kiện khi người dùng bấm nút Tiến hành đặt hàng
    const handleProceedToCheckout = () => {
        if (selectedItems.length === 0) return;

        navigate("/checkout", {
            state: {
                selectedItems: selectedItems.map((item) => ({
                    ...item,
                    product_name: item.title,
                    image: item.cover,
                })),
                couponCode: discountAmount > 0 ? appliedPromo?.code : "",
                discount: discountAmount,
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800 pb-36 lg:pb-12">
            {/* [NGÀY 9 - Responsive 360px]: Đổi px-3 sm:px-6 thành px-0 để không bị cộng dồn lề với MainLayout */}
            <div className="max-w-7xl mx-auto px-0 pt-2 sm:pt-4 lg:pt-6">
                {/* Breadcrumb & Tiêu đề */}
                <div className="mb-4 sm:mb-6">
                    <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
                        <Link
                            to="/"
                            className="hover:text-emerald-700 transition-colors"
                        >
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-gray-500">Giỏ hàng</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1e293b] tracking-tight">
                        Giỏ hàng của bạn ({items.length} sản phẩm)
                    </h1>
                </div>

                {/* Trạng thái Đang tải */}
                {loading ? (
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs py-16 px-4 text-center">
                        <p className="text-gray-400 text-sm">
                            Đang tải giỏ hàng...
                        </p>
                    </div>
                ) : items.length === 0 ? (
                    /* Trạng thái Giỏ hàng trống */
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs py-16 px-4 text-center">
                        <p className="text-gray-400 text-sm mb-4">
                            Giỏ hàng của bạn đang trống.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Tiếp tục mua sách</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                        {/* CỘT TRÁI: Danh sách sản phẩm */}
                        {/* [NGÀY 9 - Responsive 360px]: Thêm min-w-0 để danh sách sản phẩm co gọn trong khung 360px */}
                        <div className="lg:col-span-8 min-w-0">
                            {/* --- GIAO DIỆN DESKTOP --- */}
                            <div className="hidden lg:block bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[12.5px] font-medium text-gray-500">
                                                <th className="py-3.5 pl-6 pr-3 w-12">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAllSelected}
                                                        onChange={
                                                            handleSelectAll
                                                        }
                                                        className="w-4 h-4 rounded border-gray-300 accent-emerald-700 cursor-pointer"
                                                    />
                                                </th>
                                                <th className="py-3.5 px-2">
                                                    Sản phẩm
                                                </th>
                                                <th className="py-3.5 px-4">
                                                    Đơn giá
                                                </th>
                                                <th className="py-3.5 px-4 text-center">
                                                    Số lượng
                                                </th>
                                                <th className="py-3.5 px-4">
                                                    Thành tiền
                                                </th>
                                                <th className="py-3.5 pr-6 pl-2 w-12"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm">
                                            {items.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <td className="py-5 pl-6 pr-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                item.selected
                                                            }
                                                            onChange={() =>
                                                                handleSelectItem(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="w-4 h-4 rounded border-gray-300 accent-emerald-700 cursor-pointer"
                                                        />
                                                    </td>

                                                    <td className="py-5 px-2">
                                                        <div className="flex items-center gap-3.5">
                                                            <img
                                                                src={item.cover}
                                                                alt={item.title}
                                                                className="w-12 h-16 object-cover rounded shadow-xs border border-gray-100 shrink-0"
                                                            />
                                                            <div className="min-w-0">
                                                                <h3 className="font-bold text-gray-800 text-[14px] line-clamp-2">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {
                                                                        item.author
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="py-5 px-4 font-semibold text-gray-700 whitespace-nowrap">
                                                        {formatVND(item.price)}
                                                    </td>

                                                    <td className="py-5 px-4">
                                                        <div className="flex justify-center">
                                                            <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleUpdateQuantity(
                                                                            item.id,
                                                                            -1,
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg cursor-pointer"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="w-8 text-center text-xs font-semibold text-gray-800 border-x border-gray-100 py-1.5">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleUpdateQuantity(
                                                                            item.id,
                                                                            1,
                                                                        )
                                                                    }
                                                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg cursor-pointer"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="py-5 px-4 font-bold text-gray-800 whitespace-nowrap">
                                                        {formatVND(
                                                            item.price *
                                                                item.quantity,
                                                        )}
                                                    </td>

                                                    <td className="py-5 pr-6 pl-2 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveItem(
                                                                    item.id,
                                                                )
                                                            }
                                                            title="Xóa sản phẩm"
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer Bảng Desktop */}
                                <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                        Đã chọn {selectedItems.length} sản phẩm
                                    </span>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Tiếp tục mua sách</span>
                                    </Link>
                                </div>
                            </div>

                            {/* --- GIAO DIỆN MOBILE & TABLET --- */}
                            <div className="lg:hidden space-y-3">
                                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs px-3.5 py-2.5 flex items-center justify-between text-xs">
                                    <label className="inline-flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 accent-emerald-700"
                                        />
                                        <span>
                                            Chọn tất cả ({items.length})
                                        </span>
                                    </label>
                                    <Link
                                        to="/books"
                                        className="text-emerald-700 font-semibold hover:underline"
                                    >
                                        + Mua thêm
                                    </Link>
                                </div>

                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-3.5"
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={item.selected}
                                                onChange={() =>
                                                    handleSelectItem(item.id)
                                                }
                                                className="w-4 h-4 mt-1 rounded border-gray-300 accent-emerald-700 shrink-0"
                                            />

                                            <img
                                                src={item.cover}
                                                alt={item.title}
                                                className="w-16 h-[88px] object-cover rounded border border-gray-100 shrink-0"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                                    {item.author}
                                                </p>
                                                <p className="font-bold text-emerald-700 text-sm mt-1">
                                                    {formatVND(item.price)}
                                                </p>

                                                <div className="inline-flex items-center border border-gray-200 rounded-md bg-white mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.id,
                                                                -1,
                                                            )
                                                        }
                                                        className="w-8 h-7 flex items-center justify-center text-gray-500 active:bg-gray-100 text-sm"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-gray-800 border-x border-gray-100 py-1">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.id,
                                                                1,
                                                            )
                                                        }
                                                        className="w-8 h-7 flex items-center justify-center text-gray-500 active:bg-gray-100 text-sm"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 text-xs">
                                            <div className="text-gray-600 font-medium">
                                                Thành tiền:{" "}
                                                <span className="font-bold text-gray-800">
                                                    {formatVND(
                                                        item.price *
                                                            item.quantity,
                                                    )}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                                className="text-gray-400 hover:text-red-500 p-1 -mr-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CỘT PHẢI: Tóm tắt đơn hàng & Mã giảm giá */}
                        {/* [NGÀY 9 - Responsive 360px]: Thêm min-w-0 để khung mã giảm giá và tóm tắt không bị tràn ngang */}
                        <div className="lg:col-span-4 min-w-0 lg:sticky lg:top-20 bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 sm:p-6">
                            <h2 className="hidden lg:block text-lg font-bold text-[#1e293b] mb-4">
                                Tóm tắt đơn hàng
                            </h2>

                            <div className="mb-5">
                                <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-gray-800 mb-2.5">
                                    <Ticket className="w-4 h-4 text-emerald-700" />
                                    <span>Mã giảm giá</span>
                                </div>

                                <form
                                    onSubmit={handleApplyPromo}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={promoInput}
                                        onChange={(e) =>
                                            setPromoInput(e.target.value)
                                        }
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 min-w-0 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                                    />
                                    <button
                                        type="submit"
                                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
                                    >
                                        Áp dụng
                                    </button>
                                </form>

                                {appliedPromo && (
                                    <div className="mt-2.5 px-3 py-2 bg-emerald-50 rounded-lg flex items-center justify-between text-xs font-semibold text-emerald-700">
                                        <div className="flex items-center gap-1.5">
                                            <Check className="w-3.5 h-3.5" />
                                            <span>{appliedPromo.code}</span>
                                        </div>
                                        <span>
                                            −{formatVND(appliedPromo.discount)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs sm:text-sm">
                                <div className="flex items-center justify-between text-gray-500">
                                    <span>
                                        Tạm tính ({selectedItems.length} sản
                                        phẩm)
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {formatVND(subtotal)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-gray-500">
                                    <span>Giảm giá</span>
                                    <span className="font-semibold text-emerald-700">
                                        −{formatVND(discountAmount)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                                <span className="text-sm sm:text-[15px] font-bold text-gray-800">
                                    Tổng cộng
                                </span>
                                <span className="text-lg sm:text-xl font-bold text-emerald-700">
                                    {formatVND(finalTotal)}
                                </span>
                            </div>

                            {/* <button
                type="button"
                onClick={() =>
                  alert(`Tiến hành đặt hàng: ${formatVND(finalTotal)}`)
                }
                disabled={selectedItems.length === 0}
                className="hidden lg:block w-full mt-5 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Tiến hành đặt hàng ({selectedItems.length})
              </button>
            </div>
          </div>
        )}
      </div> */}
                            <button
                                type="button"
                                onClick={handleProceedToCheckout}
                                disabled={selectedItems.length === 0}
                                className="hidden lg:block w-full mt-5 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                            >
                                Tiến hành đặt hàng ({selectedItems.length})
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* THANH TỔNG CỘNG + NÚT ĐẶT HÀNG TRÊN MOBILE/TABLET */}
            {items.length > 0 && (
                <div className="lg:hidden fixed bottom-14 inset-x-0 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
                    <div>
                        <p className="text-[11px] text-gray-400">
                            Tổng cộng ({selectedItems.length} SP)
                        </p>
                        <p className="text-base sm:text-lg font-bold text-emerald-700">
                            {formatVND(finalTotal)}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleProceedToCheckout}
                        disabled={selectedItems.length === 0}
                        className="px-6 sm:px-8 py-2.5 bg-emerald-700 active:bg-emerald-800 disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        Đặt hàng ({selectedItems.length})
                    </button>
                </div>
            )}
        </div>
    );
}
