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

}
