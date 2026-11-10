<?php
// AI-assisted [AI-01]
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    // Tên bảng trong DB
    protected $table = 'products';

    // Khóa chính
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'descreption',
        'price',
        'stock',
        'author',
        'image',
        'slug',
        'category_id',
        'publisher_name',
    ];

// Quan hệ: Product thuộc về một Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'caterory_id', 'category_id');
    }

    // Quan hệ: Product nằm trong nhiều OrderItems
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_id', 'product_id');
    }

    // Quan hệ: Product nằm trong nhiều CartItems
    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'product_id', 'product_id');
    }
}