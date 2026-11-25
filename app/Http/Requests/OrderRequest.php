<?php
//AI-assisted [AI-06]
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'          => ['nullable', 'integer'],
            'product_ids'   => ['required', 'array', 'min:1'],
            'product_ids.*' => ['integer', 'distinct'],
            'receiver_name'    => ['required', 'string', 'max:150'],
            'receiver_phone'   => ['required', 'string', 'regex:/^0[0-9]{9}$/'],
            'shipping_address' => ['required', 'string', 'max:255'],
            'note'             => ['nullable', 'string', 'max:255'],
            'payment_method'   => ['nullable', 'string', 'max:50'],
            'voucher_id'       => ['nullable', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'receiver_name.required'    => 'Vui lòng nhập họ và tên người nhận.',
            'receiver_phone.required'   => 'Vui lòng nhập số điện thoại.',
            'receiver_phone.regex'      => 'Số điện thoại không hợp lệ.',
            'shipping_address.required' => 'Vui lòng nhập địa chỉ giao hàng.',
        ];
    }
}
