<?php
namespace App\Services;
use App\Models\Product;
use App\Models\Rating;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
class RatingService{
    //Lấy danh sách đánh giá sản phẩm mới nhất
    public function getByProduct(int $productId, int $perPage=10):LengthAwarePaginator{
        return Rating::with(['user:user_id,full_name'])
            ->where('product_id',$productId)
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }
    //Tạo đánh giá mới, mỗi user đánh giá 1 lần
    public function createRating(int $userId,int $productId,array $data):Rating
    {
        Product::where('product_id',$productId)->firstOrFail();
        $exists=Rating::where('user_id',$userId)
            ->where('product_id',$productId)
            ->exists();
        if($exists){
            throw new Exception("Bạn đã đánh giá sản phẩm này rồi.",409);
        }
        return Rating::create([
            'user_id'=>$userId,
            'product_id'=>$productId,
            'star'=>$data['star'],
            'comment'=>$data['comment'] ?? null,
        ]);
    }
}
?>