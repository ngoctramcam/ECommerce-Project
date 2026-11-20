<?php
// AI-assisted [AI-04]
namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    // Danh sách
    public function getAll()
    {
        return Category::orderBy('category_id', 'desc')->get();
    }

    // Thêm mới
    public function create(array $data): array
    {
        $exists = Category::where('category_name', $data['category_name'])->exists();

        if ($exists) {
            return [
                'success' => false,
                'message' => 'Tên danh mục đã tồn tại.'
            ];
        }

        $category = Category::create([
            'category_name' => $data['category_name'],
            'slug'          => $data['slug'] ?? Str::slug($data['category_name']),
            'description'   => $data['description'] ?? null,
        ]);

        return [
            'success' => true,
            'category' => $category
        ];
    }

    // Cập nhật
    public function update(int $id, array $data): array
    {
        $category = Category::find($id);

        if (!$category) {
            return [
                'success' => false,
                'message' => 'Không tìm thấy danh mục.'
            ];
        }

        $exists = Category::where('category_name', $data['category_name'])
            ->where('category_id', '!=', $id)
            ->exists();

        if ($exists) {
            return [
                'success' => false,
                'message' => 'Tên danh mục đã tồn tại.'
            ];
        }

        $category->update([
            'category_name' => $data['category_name'],
            'slug'          => $data['slug'] ?? Str::slug($data['category_name']),
            'description'   => $data['description'] ?? $category->description,
        ]);

        return [
            'success' => true,
            'category' => $category
        ];
    }

    // Xóa
    public function delete(int $id): array
    {
        $category = Category::find($id);

        if (!$category) {
            return [
                'success' => false,
                'message' => 'Không tìm thấy danh mục.'
            ];
        }

        $category->delete();

        return [
            'success' => true,
            'message' => 'Xóa thành công.'
        ];
    }
}
