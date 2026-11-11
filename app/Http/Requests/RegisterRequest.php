<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'address' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'regex:/^0\d{9}$/'],
            'role' => ['nullable', 'string', 'max:20'],
        ];
    }
    public function messages(): array
    {
        return [
            'full_name.required' => 'Họ và tên không được để trống.',
            'full_name.max'      => 'Họ và tên không được vượt quá 255 ký tự.',

            'email.required'     => 'Địa chỉ email không được để trống.',
            'email.email'        => 'Địa chỉ email không hợp lệ.',
            'email.unique'       => 'Địa chỉ email đã được sử dụng.',

            'password.required'  => 'Mật khẩu không được để trống.',
            'password.min'       => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Mật khẩu không khớp.',

            'address.max'        => 'Địa chỉ không được vượt quá giới hạn ký tự.',

            'phone.regex'        => 'Số điện thoại phải bắt đầu bằng số 0 và gồm 10 chữ số.',
        ];
    }
}
