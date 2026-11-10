<?php
// AI-assisted [AI-01]
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'voucher'; // Tên bảng theo đúng sơ đồ ERD
    protected $primaryKey = 'voucher_id';

    protected $fillable = [
        'code',
        'disbound_amount', // Khớp chính tả trên ERD
        'expired_date',
    ];

    // Quan hệ: Một Voucher được áp dụng cho nhiều Orders
    public function orders()
    {
        return $this->hasMany(Order::class, 'voucher_id', 'voucher_id');
    }
}