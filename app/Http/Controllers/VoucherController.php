<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class VoucherController extends Controller
{
    public function index(): JsonResponse
    {
        $pk = (new Voucher())->getKeyName();
        $vouchers = Voucher::orderByDesc($pk)->get();

        $result = $vouchers->map(function ($v) use ($pk) {
            $id = $v->{$pk};
            $expiry = $v->expired_date ?? $v->expiry_date ?? $v->expired_at ?? null;

            return [
                'id'              => $id,
                'voucher_code_id' => 'VC' . str_pad($id, 3, '0', STR_PAD_LEFT),
                'code'            => $v->code ?? $v->voucher_code ?? '',
                'discount_amount' => (int) ($v->discount_amount ?? 0),
                'expiry_date'     => $expiry ? date('Y-m-d', strtotime($expiry)) : '',
                'expiry_display'  => $expiry ? date('d/m/Y', strtotime($expiry)) : 'Không giới hạn',
                'created_at'      => $v->created_at ? $v->created_at->format('d/m/Y') : '',
                'updated_at'      => $v->updated_at ? $v->updated_at->format('d/m/Y') : '',
            ];
        });

        return response()->json($result);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'code'            => 'required|string|max:50',
            'discount_amount' => 'required|numeric|min:1000',
            'expiry_date'     => 'required|date',
        ], [
            'code.required'            => 'Vui lòng nhập mã voucher.',
            'discount_amount.required' => 'Vui lòng nhập số tiền giảm.',
            'discount_amount.min'      => 'Số tiền giảm tối thiểu là 1.000đ.',
            'expiry_date.required'     => 'Vui lòng chọn ngày hết hạn.',
        ]);

        $code = strtoupper(trim($request->code));
        $table = (new Voucher())->getTable();
        $codeCol = Schema::hasColumn($table, 'code') ? 'code' : 'voucher_code';

        if (Voucher::where($codeCol, $code)->exists()) {
            return response()->json([
                'message' => 'Mã voucher "' . $code . '" đã tồn tại!',
            ], 422);
        }

        $voucher = new Voucher();
        $voucher->{$codeCol} = $code;
        $voucher->discount_amount = (int) $request->discount_amount;
        $voucher->expired_date = $request->expiry_date;
        $voucher->save();

        return response()->json([
            'message' => 'Thêm mã giảm giá thành công!',
            'data'    => $voucher,
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'code'            => 'required|string|max:50',
            'discount_amount' => 'required|numeric|min:1000',
            'expiry_date'     => 'required|date',
        ]);

        $pk = (new Voucher())->getKeyName();
        $voucher = Voucher::where($pk, $id)->first();

        if (!$voucher) {
            return response()->json(['message' => 'Không tìm thấy mã giảm giá.'], 404);
        }

        $code = strtoupper(trim($request->code));
        $table = $voucher->getTable();
        $codeCol = Schema::hasColumn($table, 'code') ? 'code' : 'voucher_code';

        $exists = Voucher::where($codeCol, $code)->where($pk, '!=', $id)->exists();
        if ($exists) {
            return response()->json([
                'message' => 'Mã voucher "' . $code . '" đã được sử dụng!',
            ], 422);
        }

        $voucher->{$codeCol} = $code;
        $voucher->discount_amount = (int) $request->discount_amount;
        $voucher->expired_date = $request->expiry_date;
        $voucher->save();

        return response()->json([
            'message' => 'Cập nhật mã giảm giá thành công!',
            'data'    => $voucher,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $pk = (new Voucher())->getKeyName();
        $voucher = Voucher::where($pk, $id)->first();

        if (!$voucher) {
            return response()->json(['message' => 'Không tìm thấy mã giảm giá.'], 404);
        }

        $voucher->delete();

        return response()->json([
            'message' => 'Đã xóa mã giảm giá thành công!',
        ]);
    }
}
