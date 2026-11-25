<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
      protected $table = 'ratings'; // Tên bảng theo đúng sơ đồ ERD
    protected $primaryKey = 'rating_id';

    protected $fillable = [
        'user_id',
        'product_id',
        'star',
        'comment',
    ];
    protected $casts=[
        'star'=>'integer',
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id','user_id');
    }
    public function product(){
        return $this->belongsTo(Product::class,'product_id','product_id');
    }

}