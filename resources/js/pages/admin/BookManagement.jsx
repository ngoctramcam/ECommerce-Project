import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Pencil,Trash2,ChevronDown,X,Eye,EyeOff,ImagePlus,} from 'lucide-react';

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : '';
};

const formatVND = (amount) => Number(amount || 0).toLocaleString('vi-VN') + 'đ';

const formatCode = (id) => `SP${String(id).padStart(3, '0')}`;

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('vi-VN');
};

export default function BookManagement() {
  // Dữ liệu từ CSDL
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tìm kiếm, lọc & phân trang
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // State Modal Thêm / Sửa sách
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [productName, setProductName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // 1. Lấy danh sách sản phẩm & danh mục từ API
  const fetchBooks = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await fetch('/api/products', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setBooks(list);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sách:', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories', {
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setCategories(list);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  // 2. Mở Modal Thêm mới
  const openAddModal = () => {
    setEditingBook(null);
    setProductName('');
    setAuthor('');
    setPrice('');
    setStock('');
    setCategoryId(
      categories.length > 0
        ? String(categories[0].category_id ?? categories[0].id)
        : ''
    );
    setDescription('');
    setStatus(1);
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  // 3. Mở Modal Chỉnh sửa
  const openEditModal = (book) => {
    setEditingBook(book);
    setProductName(book.product_name || '');
    setAuthor(book.author || '');
    setPrice(book.price ?? '');
    setStock(book.stock ?? '');
    setCategoryId(String(book.category_id ?? ''));
    setDescription(book.description || '');
    setStatus(book.status ? 1 : 0);
    setImageFile(null);
    setImagePreview(book.image || '');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  // 4. Kiểm tra file ảnh đại diện: chỉ jpg/png, <= 2MB
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Ảnh đại diện chỉ chấp nhận định dạng JPG hoặc PNG!');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Dung lượng ảnh đại diện không được vượt quá 2MB!');
      e.target.value = '';
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 5. Lưu Thêm mới / Cập nhật sách xuống CSDL
  const handleSaveBook = async (e) => {
    e.preventDefault();

    if (
      !productName.trim() ||
      !author.trim() ||
      price === '' ||
      stock === '' ||
      !categoryId
    ) {
      alert('Vui lòng nhập đầy đủ Tên sách, Tác giả, Giá bán, Tồn kho và Danh mục.');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', productName.trim());
    formData.append('author', author.trim());
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category_id', categoryId);
    formData.append('description', description);
    formData.append('status', status ? '1' : '0');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const realId = editingBook ? editingBook.product_id ?? editingBook.id : null;
    const url = realId ? `/api/products/${realId}` : '/api/products';
    if (realId) {
      formData.append('_method', 'PUT');
    }

    try {
      setSubmitting(true);
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const firstError = data.errors
          ? Object.values(data.errors)[0][0]
          : data.message;
        alert(firstError || 'Không thể lưu thông tin sách.');
        return;
      }

      alert(
        data.message ||
          (realId ? 'Cập nhật sách thành công!' : 'Thêm sách mới thành công!')
      );
      closeModal();
      await fetchBooks(false);
    } catch (error) {
      console.error('Lỗi khi lưu sách:', error);
      alert('Có lỗi xảy ra khi kết nối máy chủ.');
    } finally {
      setSubmitting(false);
    }
  };

  // 6. Chuyển đổi nhanh trạng thái Ẩn / Hiện
  const handleToggleStatus = async (book) => {
    const realId = book.product_id ?? book.id;
    try {
      const res = await fetch(`/api/products/${realId}/toggle-status`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || 'Không thể đổi trạng thái hiển thị.');
        return;
      }

      await fetchBooks(false);
    } catch (error) {
      console.error('Lỗi đổi trạng thái:', error);
    }
  };

  // 7. Xóa sách và tự động reload danh sách
  const handleDeleteBook = async (book) => {
    const realId = book.product_id ?? book.id;
    if (!window.confirm(`Bạn có chắc muốn xóa sách "${book.product_name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${realId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || 'Không thể xóa sách này.');
        return;
      }

      await fetchBooks(false);
    } catch (error) {
      console.error('Lỗi khi xóa sách:', error);
      alert('Có lỗi xảy ra khi kết nối máy chủ.');
    }
  };

  // Lọc dữ liệu theo ô tìm kiếm và danh mục
  const filteredBooks = books.filter((book) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      (book.product_name || '').toLowerCase().includes(keyword) ||
      (book.author || '').toLowerCase().includes(keyword) ||
      formatCode(book.product_id ?? book.id).toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === 'all' ||
      String(book.category_id) === String(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Tính toán phân trang
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedBooks = filteredBooks.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-[26px] font-bold text-[#1e293b] tracking-tight">
            Quản lý Sách
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông tin đầu sách, giá bán, tồn kho và trạng thái hiển thị.
          </p>
        </div>

        {/* Toolbar: Search, Filter & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo mã sách, tên sách, tác giả..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[210px]">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((cat) => {
                  const id = cat.category_id ?? cat.id;
                  return (
                    <option key={id} value={id}>
                      {cat.category_name || cat.name}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Add New Book Button */}
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 bg-[#0d7a43] hover:bg-[#0a6336] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sách mới</span>
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Card Title */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#1e293b]">
              Danh sách Sách ({filteredBooks.length})
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-gray-100 text-[12.5px] font-medium text-gray-500">
                  <th className="py-3.5 px-6">Mã sách</th>
                  <th className="py-3.5 px-4">Ảnh bìa</th>
                  <th className="py-3.5 px-4">Tên sách</th>
                  <th className="py-3.5 px-4 text-center">Danh mục</th>
                  <th className="py-3.5 px-4">Tác giả</th>
                  <th className="py-3.5 px-4">Giá bán</th>
                  <th className="py-3.5 px-4 text-center">Tồn kho</th>
                  <th className="py-3.5 px-4 text-center">Hiển thị</th>
                  <th className="py-3.5 px-4">Ngày cập nhật</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="py-10 text-center text-gray-400 text-sm"
                    >
                      Đang tải dữ liệu sách...
                    </td>
                  </tr>
                ) : paginatedBooks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="py-10 text-center text-gray-400 text-sm"
                    >
                      Không tìm thấy đầu sách nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  paginatedBooks.map((book) => {
                    const realId = book.product_id ?? book.id;
                    const categoryName =
                      book.category?.category_name ||
                      book.category?.name ||
                      'Chưa phân loại';

                    return (
                      <tr
                        key={realId}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        {/* Mã sách */}
                        <td className="py-4 px-6 font-semibold text-[#15803d] text-[13px] whitespace-nowrap">
                          {formatCode(realId)}
                        </td>

                        {/* Ảnh bìa */}
                        <td className="py-4 px-4">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt={book.product_name}
                              className="w-11 h-15 object-cover rounded shadow-xs border border-gray-100"
                            />
                          ) : (
                            <div className="w-11 h-15 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
                              <ImagePlus className="w-4 h-4" />
                            </div>
                          )}
                        </td>

                        {/* Tên sách */}
                        <td className="py-4 px-4 font-semibold text-gray-800 max-w-[240px]">
                          <p className="line-clamp-2">{book.product_name}</p>
                        </td>

                        {/* Danh mục */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#e6f5ec] text-[#15803d]">
                            {categoryName}
                          </span>
                        </td>

                        {/* Tác giả */}
                        <td className="py-4 px-4 font-medium text-gray-700 text-[13.5px]">
                          {book.author}
                        </td>

                        {/* Giá bán */}
                        <td className="py-4 px-4 font-bold text-gray-800 whitespace-nowrap">
                          {formatVND(book.price)}
                        </td>

                        {/* Tồn kho */}
                        <td className="py-4 px-4 text-center font-semibold text-gray-700">
                          {book.stock}
                        </td>

                        {/* Trạng thái Ẩn / Hiện */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(book)}
                            title="Bấm để đổi trạng thái Ẩn/Hiện"
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                              book.status
                                ? 'bg-[#e6f5ec] text-[#15803d] hover:bg-[#d5eedf]'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                          >
                            {book.status ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Hiện</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Ẩn</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Ngày cập nhật */}
                        <td className="py-4 px-4 text-gray-500 text-[13px] whitespace-nowrap">
                          {formatDate(book.updated_at)}
                        </td>

                        {/* Thao tác */}
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              title="Chỉnh sửa"
                              onClick={() => openEditModal(book)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Xóa"
                              onClick={() => handleDeleteBook(book)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      safePage === page
                        ? 'bg-[#0d7a43] text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage === totalPages}
                className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL THÊM / SỬA SÁCH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1e293b]">
                {editingBook
                  ? `Chỉnh sửa Sách (${formatCode(
                      editingBook.product_id ?? editingBook.id
                    )})`
                  : 'Thêm sách mới'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveBook} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Tên sách <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="VD: Những ngày xanh"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Tác giả <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="VD: Nguyễn An"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Danh mục <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => {
                      const id = cat.category_id ?? cat.id;
                      return (
                        <option key={id} value={id}>
                          {cat.category_name || cat.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Giá bán (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="128000"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Tồn kho <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="45"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Ảnh đại diện (chỉ JPG/PNG, ≤ 2MB)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#e6f5ec] file:text-[#15803d] hover:file:bg-[#d5eedf] cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="mt-2.5 flex items-center gap-3">
                      <img
                        src={imagePreview}
                        alt="Xem trước"
                        className="w-14 h-20 object-cover rounded border border-gray-200"
                      />
                      <span className="text-xs text-gray-400">
                        Ảnh bìa hiện tại
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Trạng thái hiển thị
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  >
                    <option value={1}>Hiển thị trên gian hàng</option>
                    <option value={0}>Ẩn khỏi gian hàng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Mô tả sách
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả nội dung đầu sách..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#0d7a43] hover:bg-[#0a6336] disabled:bg-gray-400 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {submitting
                    ? 'Đang lưu...'
                    : editingBook
                    ? 'Lưu thay đổi'
                    : 'Thêm sách mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}