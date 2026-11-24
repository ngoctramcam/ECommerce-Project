<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductService
{
    /**
     * Lấy danh sách sản phẩm kèm thông tin danh mục
     */
    public function getAll($keyword = null, $categoryId = null)
    {
        $query = Product::with('category')->orderByDesc('product_id');

        if (!empty($keyword)) {
            $query->where(function ($q) use ($keyword) {
                $q->where('product_name', 'like', "%{$keyword}%")
                    ->orWhere('author', 'like', "%{$keyword}%");
            });
        }

        if (!empty($categoryId)) {
            $query->where('category_id', $categoryId);
        }

        return $query->get();
    }
    /**
     * [TV3 - TM-02]: Tìm kiếm, lọc, sắp xếp và phân trang phía server (12 sách/trang)
     */
    public function search(
        ?string $keyword = null,
        $categoryId = null,
        $minPrice = null,
        $maxPrice = null,
        ?string $sort = 'newest',
        int $page = 1
    ) {
        $query = Product::with('category')->where('status', 1);

        // 1. Tìm kiếm theo tên sách hoặc tác giả (Eloquent tự tham số hóa)
        $kw = trim((string) $keyword);
        if ($kw !== '') {
            $like = '%' . $kw . '%';
            $query->where(function ($q) use ($like) {
                $q->where('product_name', 'like', $like)
                  ->orWhere('author', 'like', $like);
            });
        }

        // 2. Lọc theo danh mục
        if (!empty($categoryId) && $categoryId !== 'all') {
            $query->where('category_id', $categoryId);
        }

        // 3. Lọc theo khoảng giá
        if ($minPrice !== null && $minPrice !== '' && is_numeric($minPrice)) {
            $query->where('price', '>=', (float) $minPrice);
        }
        if ($maxPrice !== null && $maxPrice !== '' && is_numeric($maxPrice)) {
            $query->where('price', '<=', (float) $maxPrice);
        }

        // 4. Sắp xếp (Whitelist)
        switch ($sort) {
            case 'price-asc':
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price-desc':
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
            default:
                $query->orderByDesc('product_id');
                break;
        }

        // 5. Phân trang phía server: 12 sách/trang
        return $query->paginate(12, ['*'], 'page', max(1, (int) $page));
    }

    /**
     * Lấy chi tiết 1 sản phẩm
     */
    public function findById($id)
    {
        return Product::with('category')->findOrFail($id);
    }

    /**
     * Thêm mới sản phẩm
     */
    public function create(array $data, ?UploadedFile $imageFile = null)
    {
        $imagePath = null;

        if ($imageFile) {
            $imagePath = $this->uploadImage($imageFile);
        }

        return Product::create([
            'product_name' => $data['product_name'],
            'author'       => $data['author'],
            'price'        => $data['price'],
            'stock'        => $data['stock'],
            'category_id'  => $data['category_id'],
            'description'  => $data['description'] ?? null,
            'status'       => isset($data['status']) ? (int) $data['status'] : 1,
            'image'        => $imagePath,
            'slug'          => $data['slug'] ?? Str::slug($data['product_name']),
        ]);
    }

    /**
     * Cập nhật sản phẩm
     */
    public function update($id, array $data, ?UploadedFile $imageFile = null)
    {
        $product = Product::findOrFail($id);

        $imagePath = $product->image;

        // Nếu có tải lên ảnh mới -> xóa ảnh cũ và lưu ảnh mới với tên ngẫu nhiên
        if ($imageFile) {
            $this->deleteOldImage($product->image);
            $imagePath = $this->uploadImage($imageFile);
        }

        $product->update([
            'product_name' => $data['product_name'] ?? $product->product_name,
            'author'       => $data['author'] ?? $product->author,
            'price'        => $data['price'] ?? $product->price,
            'stock'        => $data['stock'] ?? $product->stock,
            'category_id'  => $data['category_id'] ?? $product->category_id,
            'description'  => array_key_exists('description', $data) ? $data['description'] : $product->description,
            'status'       => isset($data['status']) ? (int) $data['status'] : $product->status,
            'image'        => $imagePath,
        ]);

        return $product->load('category');
    }

    /**
     * Đổi nhanh trạng thái ẩn / hiện
     */
    public function toggleStatus($id)
    {
        $product = Product::findOrFail($id);
        $product->status = $product->status ? 0 : 1;
        $product->save();

        return $product;
    }

    /**
     * Xóa sản phẩm
     */
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $this->deleteOldImage($product->image);
        $product->status = 0; // hoặc false
        $product->save();
        return $product->delete();
    }

    /**
     * Lưu ảnh đại diện với tên tệp ngẫu nhiên vào public/uploads/products
     */
    private function uploadImage(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $randomName = time() . '_' . Str::random(20) . '.' . $extension;

        $destinationPath = public_path('uploads/products');
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        $file->move($destinationPath, $randomName);

        // Trả về đường dẫn tương đối để React hiển thị trực tiếp qua <img src={product.image} />
        return '/uploads/products/' . $randomName;
    }

    /**
     * Xóa file ảnh cũ trên ổ đĩa nếu tồn tại
     */
    private function deleteOldImage(?string $imagePath): void
    {
        if (!$imagePath) return;

        $fullPath = public_path(ltrim($imagePath, '/'));
        if (File::exists($fullPath)) {
            File::delete($fullPath);
        }
    }
}