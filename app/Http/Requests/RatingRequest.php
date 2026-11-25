<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class RatingRequest extends FormRequest{
    public function authorize():bool{
        return true;
    }
    public function rules():array{
        return[
            'cart'=>['required','integer','min:1','max:5'],
            'comment'=>['nullable','string','max:1000']
        ];
    }
    #[Override]
    public function messages():array
    {
        return[
        'star.required'=>'Vui lòng chọn số sao để đánh giá.',
        'star.integer'=>'Số sao phải là số nguyên.',
        'star.min'=>'Số sao tối thiểu là 1.',
        'star.max'=>'Số sao tối đa là 5',
        'comment.max'=>'Comment không vượt quá 1000 ký tự.'
        ];
    }
}
?>