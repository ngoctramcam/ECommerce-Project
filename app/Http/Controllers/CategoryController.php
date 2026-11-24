<?php
// AI-assisted [AI-04]
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    // Danh sách
    public function index()
    {
        return response()->json(
            $this->categoryService->getAll()
        );
    }

    // Thêm
    public function store(Request $request)
    {
        $result = $this->categoryService->create(
            $request->all()
        );

        return response()->json($result);
    }

    // Sửa
    public function update(Request $request, $id)
    {
        $result = $this->categoryService->update(
            $id,
            $request->all()
        );

        return response()->json($result);
    }

    // Xóa
    public function destroy($id)
    {
        $result = $this->categoryService->delete($id);

        return response()->json($result);
    }
}
