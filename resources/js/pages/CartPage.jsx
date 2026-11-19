import React, { useState } from 'react';
import {
  Trash2,
  Ticket,
  Check,
  ArrowLeft,
  ChevronDown,
  Home,
  LayoutGrid,
  ShoppingCart,
  User,
} from 'lucide-react';

const initialCartItems = [
  {
    id: 1,
    title: 'Những ngày xanh',
    author: 'Nguyễn An',
    price: 128000,
    quantity: 1,
    selected: true,
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 2,
    title: 'Đi qua mùa gió',
    author: 'Trần Minh',
    price: 96000,
    quantity: 1,
    selected: true,
    cover:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 3,
    title: 'Một thoáng bình yên',
    author: 'Lê Hạ',
    price: 115000,
    quantity: 1,
    selected: true,
    cover:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200',
  },
];

// Hàm định dạng tiền tệ VNĐ
const formatVND = (amount) => amount.toLocaleString('vi-VN') + 'đ';

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState({
    code: 'MOC15',
    discount: 15000,
  });

  // Kiểm tra tất cả sản phẩm có đang được chọn hay không
  const isAllSelected =
    items.length > 0 && items.every((item) => item.selected);

  // Chọn / Bỏ chọn tất cả
  const handleSelectAll = () => {
    const nextState = !isAllSelected;
    setItems((prev) => prev.map((item) => ({ ...item, selected: nextState })));
  };

  // Chọn / Bỏ chọn từng sản phẩm
  const handleSelectItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Tăng / Giảm số lượng
  const handleUpdateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Xóa sản phẩm
  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Áp dụng mã giảm giá
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === 'MOC15') {
      setAppliedPromo({ code: 'MOC15', discount: 15000 });
      setPromoInput('');
    } else {
      alert('Mã thử nghiệm hợp lệ là: MOC15');
    }
  };

  // Tính toán tổng tiền các sản phẩm được chọn
  const selectedItems = items.filter((item) => item.selected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount =
    subtotal > 0 && appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans text-gray-800 pb-36 lg:pb-0">
      {/* NAVBAR DESKTOP */}
      <header className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between text-sm">
          <nav className="flex items-center gap-8 font-medium">
            <a href="#home" className="text-[#0d7a43] font-semibold">
              Trang chủ
            </a>
            <button className="flex items-center gap-1 text-gray-700 hover:text-[#0d7a43] cursor-pointer">
              <span>Danh mục sách</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <a href="#all-books" className="text-gray-700 hover:text-[#0d7a43]">
              Tất cả sách
            </a>
          </nav>
          <a
            href="#account"
            className="text-gray-500 hover:text-gray-800 font-medium"
          >
            Tài khoản
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-8">
        {/* Breadcrumb & Page Title */}
        <div className="mb-5 lg:mb-6">
          <div className="text-xs text-gray-400 mb-1.5 flex items-center gap-1.5">
            <span className="hover:text-gray-600 cursor-pointer">Trang chủ</span>
            <span>/</span>
            <span className="text-gray-500">Giỏ hàng</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1e293b] tracking-tight">
            Giỏ hàng của bạn ({items.length} sản phẩm)
          </h1>
        </div>

        {/* Grid 2 Cột trên Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI: Danh sách sản phẩm */}
          <div className="lg:col-span-8">
            {/* --- GIAO DIỆN DESKTOP (Bảng) --- */}
            <div className="hidden lg:block bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[12.5px] font-medium text-gray-400">
                    <th className="py-4 pl-6 pr-3 w-12">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 accent-[#0d7a43] cursor-pointer"
                      />
                    </th>
                    <th className="py-4 px-2">Sản phẩm</th>
                    <th className="py-4 px-4">Đơn giá</th>
                    <th className="py-4 px-4 text-center">Số lượng</th>
                    <th className="py-4 px-4">Thành tiền</th>
                    <th className="py-4 pr-6 pl-2 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Checkbox */}
                      <td className="py-5 pl-6 pr-3">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleSelectItem(item.id)}
                          className="w-4 h-4 rounded border-gray-300 accent-[#0d7a43] cursor-pointer"
                        />
                      </td>

                      {/* Ảnh bìa + Tên + Tác giả */}
                      <td className="py-5 px-2">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded shadow-xs border border-gray-100 shrink-0"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800 text-[14px]">
                              {item.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                              {item.author}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Đơn giá */}
                      <td className="py-5 px-4 font-semibold text-gray-700">
                        {formatVND(item.price)}
                      </td>

                      {/* Bộ chọn số lượng */}
                      <td className="py-5 px-4">
                        <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white mx-auto">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Thành tiền */}
                      <td className="py-5 px-4 font-bold text-gray-800">
                        {formatVND(item.price * item.quantity)}
                      </td>

                      {/* Nút xóa */}
                      <td className="py-5 pr-6 pl-2 text-right">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          title="Xóa sản phẩm"
                          className="text-gray-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {items.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-12 text-center text-gray-400 text-sm"
                      >
                        Giỏ hàng của bạn đang trống.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Footer Bảng Desktop */}
              <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Đã chọn {selectedItems.length} sản phẩm
                </span>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-1.5 text-[#0d7a43] font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Tiếp tục mua sách</span>
                </a>
              </div>
            </div>

            {/* --- GIAO DIỆN MOBILE (Danh sách Card) --- */}
            <div className="lg:hidden space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-3.5"
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 mt-1 rounded border-gray-300 accent-[#0d7a43]"
                    />

                    {/* Ảnh bìa */}
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-14 h-20 object-cover rounded border border-gray-100 shrink-0"
                    />

                    {/* Thông tin & Bộ đếm */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.author}
                      </p>
                      <p className="font-bold text-gray-800 text-sm mt-1">
                        {formatVND(item.price)}
                      </p>

                      {/* Nút tăng giảm số lượng */}
                      <div className="inline-flex items-center border border-gray-200 rounded-md bg-white mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-7 h-6 flex items-center justify-center text-gray-500 text-sm"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-7 h-6 flex items-center justify-center text-gray-500 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dòng Thành tiền + Icon Xóa ở đáy Card */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100 text-xs">
                    <div className="text-gray-500">
                      Thành tiền:{' '}
                      <span className="font-bold text-gray-800">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: Tóm tắt đơn hàng & Mã giảm giá */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sm:p-6">
            <h2 className="hidden lg:block text-lg font-bold text-[#1e293b] mb-4">
              Tóm tắt đơn hàng
            </h2>

            {/* Mã giảm giá */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2.5">
                <Ticket className="w-4 h-4 text-[#0d7a43]" />
                <span>Mã giảm giá</span>
              </div>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0d7a43] hover:bg-[#0a6336] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>

              {/* Tag mã đang áp dụng */}
              {appliedPromo && (
                <div className="mt-2.5 px-3 py-2 bg-[#e8f5ee] rounded-lg flex items-center justify-between text-xs font-semibold text-[#0d7a43]">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>{appliedPromo.code}</span>
                  </div>
                  <span>−{formatVND(appliedPromo.discount)}</span>
                </div>
              )}
            </div>

            {/* Chi tiết tính tiền */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-gray-500">
                <span>Tạm tính</span>
                <span className="font-semibold text-gray-800">
                  {formatVND(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Giảm giá</span>
                <span className="font-semibold text-[#0d7a43]">
                  −{formatVND(discountAmount)}
                </span>
              </div>
            </div>

            {/* Tổng cộng */}
            <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">Tổng cộng</span>
              <span className="text-lg sm:text-xl font-bold text-[#0d7a43]">
                {formatVND(finalTotal)}
              </span>
            </div>

            {/* Nút Tiến hành đặt hàng (Desktop) */}
            <button
              onClick={() =>
                alert(`Tiến hành đặt hàng: ${formatVND(finalTotal)}`)
              }
              disabled={selectedItems.length === 0}
              className="hidden lg:block w-full mt-5 py-3 bg-[#0d7a43] hover:bg-[#0a6336] disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER DESKTOP */}
      <footer className="hidden lg:block bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8 text-sm">
          <div className="col-span-5">
            <h3 className="text-base font-bold text-[#0d7a43]">Mộc Sách</h3>
            <p className="text-xs text-gray-400 mt-2">
              Nuôi dưỡng tâm hồn qua từng trang sách.
            </p>
          </div>
          <div className="col-span-3 space-y-2.5">
            <h4 className="font-bold text-gray-800 text-xs">Khám phá</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <a href="#home" className="hover:text-[#0d7a43]">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#0d7a43]">
                  Danh mục sách
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 space-y-2.5">
            <h4 className="font-bold text-gray-800 text-xs">
              Tài khoản của bạn
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>
                <a href="#cart" className="hover:text-[#0d7a43]">
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a href="#orders" className="hover:text-[#0d7a43]">
                  Đơn hàng của tôi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR & NAVIGATION (CHỈ HIỆN TRÊN MOBILE) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
        {/* Thanh Tổng cộng + Nút Đặt hàng */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div>
            <p className="text-[11px] text-gray-400">Tổng cộng</p>
            <p className="text-base font-bold text-[#0d7a43]">
              {formatVND(finalTotal)}
            </p>
          </div>
          <button
            onClick={() => alert(`Đặt hàng thành công: ${formatVND(finalTotal)}`)}
            disabled={selectedItems.length === 0}
            className="px-7 py-2.5 bg-[#0d7a43] active:bg-[#0a6336] disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg"
          >
            Đặt hàng
          </button>
        </div>

        {/* Bottom Navigation 4 Tabs */}
        <nav className="grid grid-cols-4 py-2 text-[11px] font-medium text-gray-400">
          <a
            href="#home"
            className="flex flex-col items-center justify-center gap-1 hover:text-[#0d7a43]"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </a>
          <a
            href="#categories"
            className="flex flex-col items-center justify-center gap-1 hover:text-[#0d7a43]"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Danh mục</span>
          </a>
          <a
            href="#cart"
            className="flex flex-col items-center justify-center gap-1 text-[#0d7a43] font-semibold relative"
          >
            <span className="w-6 h-0.5 bg-[#0d7a43] rounded-full absolute -top-2"></span>
            <ShoppingCart className="w-4 h-4" />
            <span>Giỏ hàng</span>
          </a>
          <a
            href="#account"
            className="flex flex-col items-center justify-center gap-1 hover:text-[#0d7a43]"
          >
            <User className="w-4 h-4" />
            <span>Tài khoản</span>
          </a>
        </nav>
      </div>
    </div>
  );
}