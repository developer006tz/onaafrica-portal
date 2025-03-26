<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteStaffRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return isAdmin();
    }

   
    public function rules(): array
    {
        return [
            
        ];
    }
}
