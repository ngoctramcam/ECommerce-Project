import React, { useState } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';

const initialCategories = [
  {
    id: 'DM001',
    name: 'Văn học Việt Nam',
    slug: 'van-hoc-viet-nam',
    description: 'Tác phẩm văn học và những câu chuyện Việt Nam.',
    createdAt: '02/01/2026',
    updatedAt: '12/11/2026',
  },
  {
    id: 'DM002',
    name: 'Kinh tế',
    slug: 'kinh-te',
    description: 'Kiến thức kinh tế, quản trị và kinh doanh.',
    createdAt: '02/01/2026',
    updatedAt: '10/11/2026',
  },
  {
    id: 'DM003',
    name: 'Kỹ năng sống',
    slug: 'ky-nang-song',
    description: 'Nuôi dưỡng thói quen và phát triển bản thân.',
    createdAt: '03/01/2026',
    updatedAt: '08/11/2026',
  },
  {
    id: 'DM004',
    name: 'Thiếu nhi',
    slug: 'thieu-nhi',
    description: 'Câu chuyện và kiến thức dành cho bạn đọc nhỏ.',
    createdAt: '03/01/2026',
    updatedAt: '06/11/2026',
  },
  {
    id: 'DM005',
    name: 'Văn học nước ngoài',
    slug: 'van-hoc-nuoc-ngoai',
    description: 'Những tác phẩm văn học đặc sắc trên thế giới.',
    createdAt: '05/01/2026',
    updatedAt: '05/11/2026',
  },
];

// Hàm tự động tạo slug từ tên danh mục
const createSlug = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export default function CategoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('Văn học Việt Nam');
  const [description, setDescription] = useState(
    'Tác phẩm văn học và những câu chuyện Việt Nam.'
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc danh mục theo từ khóa
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý làm mới form
  const handleReset = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  // Xử lý chọn sửa danh mục
  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý lưu (thêm mới hoặc cập nhật)
  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('Vui lòng điền đầy đủ thông tin trước khi lưu.');
      return;
    }

    const today = '19/11/2026';

    if (editingId) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: name.trim(),
                slug: createSlug(name),
                description: description.trim(),
                updatedAt: today,
              }
            : item
        )
      );
    } else {
      const nextNum = String(categories.length + 1).padStart(3, '0');
      const newCategory = {
        id: `DM${nextNum}`,
        name: name.trim(),
        slug: createSlug(name),
        description: description.trim(),
        createdAt: today,
        updatedAt: today,
      };
      setCategories([newCategory, ...categories]);
    }
    handleReset();
  };

  // Xử lý xóa danh mục
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) handleReset();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#1e293b] tracking-tight">
            Quản lý Danh mục
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sắp xếp sách theo từng chủ đề.
          </p>
        </div>

        {/* Main Responsive Layout: 1 cột trên mobile, 12 cột trên desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI: Form Thêm / Sửa Danh Mục */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#1e293b]">
              Thêm / Sửa Danh Mục
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-5">
              Thông tin cơ bản của danh mục sách.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Tên danh mục */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên danh mục..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                />
              </div>

              {/* Mô tả danh mục */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mô tả danh mục
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả chi tiết cho danh mục..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#0d7a43] hover:bg-[#0a6336] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Lưu danh mục
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Làm mới
                </button>
              </div>

              <p className="text-xs text-gray-400 pt-1">
                Điền đầy đủ thông tin trước khi lưu.
              </p>
            </form>
          </div>

          {/* CỘT PHẢI: Danh sách Danh mục */}
          <div className="lg:col-span-8">
            {/* --- GIAO DIỆN DESKTOP (Bảng) --- */}
            <div className="hidden lg:block bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
              {/* Top Bar */}
              <div className="p-6 flex items-center justify-between gap-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-[#1e293b]">
                    Danh sách Danh mục
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {filteredCategories.length} danh mục
                  </p>
                </div>

                {/* Search Input Desktop */}
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-gray-100 text-[12.5px] font-medium text-gray-500">
                      <th className="py-3.5 px-6">Mã</th>
                      <th className="py-3.5 px-4">Tên danh mục</th>
                      <th className="py-3.5 px-4">Mô tả</th>
                      <th className="py-3.5 px-4">Ngày tạo</th>
                      <th className="py-3.5 px-4">Cập nhật</th>
                      <th className="py-3.5 px-6 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredCategories.map((cat) => (
                      <tr
                        key={cat.id}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="py-4 px-6 font-semibold text-[#15803d] text-[13px] align-top pt-5">
                          {cat.id}
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-800 align-top pt-5 max-w-[140px]">
                          {cat.name}
                        </td>
                        <td className="py-4 px-4 text-gray-500 text-[13px] align-top pt-5 max-w-[210px] leading-relaxed">
                          {cat.description}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-[13px] align-top pt-5">
                          {cat.createdAt}
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-[13px] align-top pt-5">
                          {cat.updatedAt}
                        </td>
                        <td className="py-4 px-6 align-top pt-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              title="Chỉnh sửa"
                              onClick={() => handleEdit(cat)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              title="Xóa"
                              onClick={() => handleDelete(cat.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Desktop Pagination */}
              <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Trước
                </button>
                <button className="w-9 h-9 text-sm font-medium rounded-lg bg-[#0d7a43] text-white">
                  1
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Sau
                </button>
              </div>
            </div>

            {/* --- GIAO DIỆN MOBILE / TABLET (Dạng thẻ Card) --- */}
            <div className="lg:hidden space-y-4">
              <div className="pt-2">
                <h2 className="text-lg font-bold text-[#1e293b] mb-3">
                  Danh sách Danh mục
                </h2>
                {/* Search Input Mobile */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Danh sách Card */}
              <div className="space-y-3.5">
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 space-y-3"
                  >
                    {/* Tên & Mã */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-800 text-base">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-medium text-gray-400">
                        {cat.id}
                      </span>
                    </div>

                    {/* Đường dẫn (Slug) */}
                    <div>
                      <p className="text-xs text-gray-400">Đường dẫn</p>
                      <p className="text-sm font-medium text-[#15803d]">
                        {cat.slug}
                      </p>
                    </div>

                    {/* Mô tả */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Ngày tạo & Cập nhật */}
                    <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">Ngày tạo</p>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                          {cat.createdAt}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Cập nhật</p>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                          {cat.updatedAt}
                        </p>
                      </div>
                    </div>

                    {/* 2 Nút Sửa / Xóa */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Pagination */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-[#0d7a43] text-white'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}