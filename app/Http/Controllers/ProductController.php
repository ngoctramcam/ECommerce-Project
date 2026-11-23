<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    // GET /api/products
    public function index(Request $request)
    {
        $products = $this->productService->getAll(
            $request->query('keyword'),
            $request->query('category_id')
        );

        return response()->json($products);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = $this->productService->findById($id);
        return response()->json($product);
    }

    // POST /api/products
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'author'       => 'required|string|max:255',
            'price'        => 'required|numeric|min:0',
            'stock'        => 'required|integer|min:0',
            'category_id'  => 'required|integer|exists:categories,category_id',
            'description'  => 'nullable|string',
            'status'       => 'nullable|boolean',
            'image'        => 'nullable|file|mimes:jpg,jpeg,png|max:2048', // Chỉ jpg/png, <= 2MB
        ], [
            'product_name.required' => 'Vui lòng nhập tên sản phẩm.',
            'author.required'       => 'Vui lòng nhập tên tác giả.',
            'price.required'        => 'Vui lòng nhập giá bán.',
            'stock.required'        => 'Vui lòng nhập số lượng tồn kho.',
            'category_id.required'  => 'Vui lòng chọn danh mục.',
            'category_id.exists'    => 'Danh mục không tồn tại.',
            'image.mimes'           => 'Ảnh đại diện chỉ chấp nhận định dạng JPG hoặc PNG.',
            'image.max'             => 'Dung lượng ảnh đại diện không được vượt quá 2MB.',
        ]);

        $product = $this->productService->create(
            $validated,
            $request->file('image')
        );

        return response()->json([
            'message' => 'Thêm sản phẩm thành công!',
            'data'    => $product,
        ], 201);
    }

    // PUT/PATCH /api/products/{id} (Hỗ trợ cả POST kèm _method=PUT khi gửi FormData có file)
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'author'       => 'required|string|max:255',
            'price'        => 'required|numeric|min:0',
            'stock'        => 'required|integer|min:0',
            'category_id'  => 'required|integer|exists:categories,category_id',
            'description'  => 'nullable|string',
            'status'       => 'nullable|boolean',
            'image'        => 'nullable|file|mimes:jpg,jpeg,png|max:2048', // Chỉ jpg/png, <= 2MB
        ], [
            'image.mimes' => 'Ảnh đại diện chỉ chấp nhận định dạng JPG hoặc PNG.',
            'image.max'   => 'Dung lượng ảnh đại diện không được vượt quá 2MB.',
        ]);

        $product = $this->productService->update(
            $id,
            $validated,
            $request->file('image')
        );

        return response()->json([
            'message' => 'Cập nhật sản phẩm thành công!',
            'data'    => $product,
        ]);
    }

    // PATCH /api/products/{id}/toggle-status
    public function toggleStatus($id)
    {
        $product = $this->productService->toggleStatus($id);

        return response()->json([
            'message' => 'Đã cập nhật trạng thái hiển thị!',
            'data'    => $product,
        ]);
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        $this->productService->delete($id);

        return response()->json([
            'message' => 'Xóa sản phẩm thành công!',
        ]);
    }
}