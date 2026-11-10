<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * Tên bảng trong DB
     * 
     * @var string
     */
    protected $table = 'categories';

    // Khóa chính
    protected $primaryKey = 'category_id';

    /**
     * Các thuộc tính cho phép gán dữ liệu hàng loạt
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'category_name',
        'description',
        'slug',
    ];

    /**
     * Định nghĩa quan hệ: Một Danh mục có nhiều Sản phẩm.
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
}