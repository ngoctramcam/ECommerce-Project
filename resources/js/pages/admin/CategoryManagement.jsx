import React, { useState, useEffect } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';

const createSlug = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Hàm định dạng ngày từ Laravel (ISO string) sang dd/mm/yyyy
const formatDate = (dateString) => {
  if (!dateString) return '---';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('vi-VN');
};

// Hàm format mã hiển thị (ví dụ: 1 -> DM001)
const formatCode = (id) => {
  if (typeof id === 'string' && id.startsWith('DM')) return id;
  return `DM${String(id).padStart(3, '0')}`;
};

// Lấy CSRF token từ thẻ <meta name="csrf-token"> của Laravel
const getCsrfToken = () =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Lấy dữ liệu từ CSDL khi trang vừa tải
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories');
      const data = await res.json();
      // Hỗ trợ cả dữ liệu trả về dạng mảng [...] hoặc phân trang { data: [...] }
      const list = Array.isArray(data) ? data : data.data || [];
      setCategories(list);
    } catch (error) {
      console.error('Lỗi khi tải danh mục từ CSDL:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Lọc danh mục theo từ khóa (chống lỗi khi id là số hoặc description bị null)
  const filteredCategories = categories.filter((cat) => {
    const keyword = searchTerm.toLowerCase();
    const catName = (cat.category_name || '').toLowerCase();
    const catDesc = (cat.description || '').toLowerCase();
    const catCode = formatCode(cat.category_id).toLowerCase();

    return (
      catName.includes(keyword) ||
      catDesc.includes(keyword) ||
      catCode.includes(keyword)
    );
  });

  // Xử lý làm mới form
  const handleReset = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  // Xử lý chọn sửa danh mục
  const handleEdit = (category) => {
    setEditingId(category.category_id);
    setName(category.category_name || '');
    setDescription(category.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý lưu (thêm mới hoặc cập nhật xuống CSDL)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('Vui lòng điền đầy đủ thông tin trước khi lưu.');
      return;
    }

    const payload = {
      category_name: name.trim(),
      slug: createSlug(name),
      description: description.trim(),
    };

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || 'Không thể lưu danh mục (kiểm tra quyền Admin hoặc dữ liệu).');
        return;
      }

      // Tải lại danh sách mới nhất từ CSDL
      await fetchCategories();
      handleReset();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
      alert('Có lỗi xảy ra khi kết nối máy chủ.');
    }
  };

  // Xử lý xóa danh mục khỏi CSDL
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
      });

      if (!res.ok) {
        alert('Không thể xóa danh mục này.');
        return;
      }
      // Tự động gọi lại API lấy danh sách mới nhất từ CSDL
      await fetchCategories();
      setCategories((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) handleReset();
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
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

        {/* Main Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT TRÁI: Form Thêm / Sửa Danh Mục */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#1e293b]">
              {editingId ? `Sửa Danh Mục (${formatCode(editingId)})` : 'Thêm / Sửa Danh Mục'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-5">
              Thông tin cơ bản của danh mục sách.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
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

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#0d7a43] hover:bg-[#0a6336] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingId ? 'Cập nhật' : 'Lưu danh mục'}
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
              <div className="p-6 flex items-center justify-between gap-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-[#1e293b]">
                    Danh sách Danh mục
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {loading ? 'Đang tải dữ liệu...' : `${filteredCategories.length} danh mục`}
                  </p>
                </div>

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
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          Đang tải danh sách danh mục từ cơ sở dữ liệu...
                        </td>
                      </tr>
                    ) : filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-400">
                          Chưa có danh mục nào.
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((cat) => (
                        <tr
                          key={cat.category_id}
                          className="hover:bg-gray-50/70 transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold text-[#15803d] text-[13px] align-top pt-5">
                            {formatCode(cat.category_id)}
                          </td>
                          <td className="py-4 px-4 font-semibold text-gray-800 align-top pt-5 max-w-[140px]">
                            {cat.category_name}
                          </td>
                          <td className="py-4 px-4 text-gray-500 text-[13px] align-top pt-5 max-w-[210px] leading-relaxed">
                            {cat.description || 'Không có mô tả'}
                          </td>
                          <td className="py-4 px-4 text-gray-600 text-[13px] align-top pt-5">
                            {formatDate(cat.created_at || cat.createdAt)}
                          </td>
                          <td className="py-4 px-4 text-gray-600 text-[13px] align-top pt-5">
                            {formatDate(cat.updated_at || cat.updatedAt)}
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
                                onClick={() => handleDelete(cat.category_id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
                  {currentPage}
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

              <div className="space-y-3.5">
                {filteredCategories.map((cat) => (
                  <div
                    key={cat.category_id}
                    className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-800 text-base">
                        {cat.category_name}
                      </h3>
                      <span className="text-xs font-medium text-gray-400">
                        {formatCode(cat.category_id)}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Đường dẫn</p>
                      <p className="text-sm font-medium text-[#15803d]">
                        {cat.slug}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cat.description || 'Không có mô tả'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">Ngày tạo</p>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                          {formatDate(cat.created_at || cat.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Cập nhật</p>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">
                          {formatDate(cat.updated_at || cat.updatedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={() => handleDelete(cat.category_id)}
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}