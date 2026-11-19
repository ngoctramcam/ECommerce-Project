import React, { useState } from 'react';
import { Search, Plus, Pencil, Trash2, ChevronDown } from 'lucide-react';

const initialBooks = [
  {
    id: 'SP001',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200',
    title: 'Những ngày xanh',
    category: 'Văn học Việt Nam',
    author: 'Nguyễn An',
    publisher: 'NXB Trẻ',
    price: '128.000đ',
    stock: 45,
    updatedAt: '12/11/2026',
  },
  {
    id: 'SP002',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200',
    title: 'Đi qua mùa gió',
    category: 'Văn học Việt Nam',
    author: 'Trần Minh',
    publisher: 'NXB Kim Đồng',
    price: '96.000đ',
    stock: 32,
    updatedAt: '11/11/2026',
  },
  {
    id: 'SP003',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200',
    title: 'Một thoáng bình yên',
    category: 'Kỹ năng sống',
    author: 'Lê Hạ',
    publisher: 'NXB Thanh Niên',
    price: '115.000đ',
    stock: 68,
    updatedAt: '10/11/2026',
  },
  {
    id: 'SP004',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200',
    title: 'Chạm vào nắng mai',
    category: 'Văn học Việt Nam',
    author: 'Phạm Linh',
    publisher: 'NXB Văn Học',
    price: '142.000đ',
    stock: 24,
    updatedAt: '09/11/2026',
  },
  {
    id: 'SP005',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200',
    title: 'Một thoáng bình yên (bìa mềm)',
    category: 'Kỹ năng sống',
    author: 'Lê Hạ',
    publisher: 'NXB Thanh Niên',
    price: '105.000đ',
    stock: 56,
    updatedAt: '08/11/2026',
  },
  {
    id: 'SP006',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200',
    title: 'Chạm vào nắng mai (bìa cứng)',
    category: 'Văn học Việt Nam',
    author: 'Phạm Linh',
    publisher: 'NXB Văn Học',
    price: '168.000đ',
    stock: 18,
    updatedAt: '07/11/2026',
  },
];

export default function BookManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo ô tìm kiếm và danh mục
  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-[26px] font-bold text-[#1e293b] tracking-tight">
            Quản lý Sách
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông tin đầu sách, giá bán và tồn kho.
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
                placeholder="Tìm theo tên sách, tác giả, NXB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[210px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="Văn học Việt Nam">Văn học Việt Nam</option>
                <option value="Kỹ năng sống">Kỹ năng sống</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Add New Book Button */}
          <button
            onClick={() => alert('Mở modal thêm sách mới')}
            className="inline-flex items-center justify-center gap-2 bg-[#0d7a43] hover:bg-[#0a6336] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sách mới</span>
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          {/* Card Title */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-[17px] font-bold text-[#1e293b]">
              Danh sách Sách
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
                  <th className="py-3.5 px-4">Tác giả & NXB</th>
                  <th className="py-3.5 px-4">Giá bán</th>
                  <th className="py-3.5 px-4 text-center">Tồn kho</th>
                  <th className="py-3.5 px-4">Ngày cập nhật</th>
                  <th className="py-3.5 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Mã sách */}
                    <td className="py-4 px-6 font-semibold text-[#15803d] text-[13px]">
                      {book.id}
                    </td>

                    {/* Ảnh bìa */}
                    <td className="py-4 px-4">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-11 h-15 object-cover rounded shadow-xs border border-gray-100"
                      />
                    </td>

                    {/* Tên sách */}
                    <td className="py-4 px-4 font-semibold text-gray-800 align-top pt-5">
                      {book.title}
                    </td>

                    {/* Danh mục */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3.5 py-1 rounded-full text-xs font-medium bg-[#e6f5ec] text-[#15803d]">
                        {book.category}
                      </span>
                    </td>

                    {/* Tác giả & NXB */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800 text-[13.5px]">
                        {book.author}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {book.publisher}
                      </div>
                    </td>

                    {/* Giá bán */}
                    <td className="py-4 px-4 font-bold text-gray-800">
                      {book.price}
                    </td>

                    {/* Tồn kho */}
                    <td className="py-4 px-4 text-center font-semibold text-gray-700">
                      {book.stock}
                    </td>

                    {/* Ngày cập nhật */}
                    <td className="py-4 px-4 text-gray-500 text-[13px]">
                      {book.updatedAt}
                    </td>

                    {/* Thao tác */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          title="Chỉnh sửa"
                          onClick={() => alert(`Sửa sách: ${book.title}`)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Xóa"
                          onClick={() => alert(`Xóa sách: ${book.title}`)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBooks.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="py-10 text-center text-gray-400 text-sm"
                    >
                      Không tìm thấy đầu sách nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Trước
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#0d7a43] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              disabled={currentPage === 3}
              className="px-3.5 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}