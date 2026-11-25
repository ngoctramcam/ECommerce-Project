<?php
namespace App\Http\Controllers;
use App\Http\Requests\RatingRequest;
use App\Models\Product;
use App\Services\RatingService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RatingController extends Controller{
    public function __construct(protected RatingService $ratingService)
    {
        
    }
    //GET /api/products/{productId}/ratings
    public function index(Request $request,int $productId):JsonResponse
    {
        $perPage=(int)$request->query('per_page',10);
        $ratings=$this->ratingService->getByProduct($productId,$perPage);
        return response()->json([
            'status'=>true,
            'data'=>$ratings,
        ]);
    }
    //POST /api/products/{productId}/ratings
    public function store(RatingRequest $request,int $productId):JsonResponse
    {
        try{
            $userId=$request->user()->user_id;
            $rating=$this->ratingService->createRating($userId,$productId,$request->validated());
            return response()->json([
                'status'=>true,
                'message'=>'Đánh giá sản phẩm thành công.',
                'data'=>$rating,
            ],201);
        }catch(ModelNotFoundException){
            return response()->json([
                'status'=>false,
                'message'=>'Sản phẩm không tồn tại.',
            ],404);
        }catch(Exception $e){
            $code=$e->getCode()===409?409:400;
            return response()->json([
                'status'=>false,
                'message'=>$e->getMessage(),
            ],$code);
        }
    }
}
?>