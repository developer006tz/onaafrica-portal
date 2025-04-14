<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_person_phone' => 'nullable|string|max:30',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:30',
            'address' => 'nullable|string',
            'tin' => 'nullable|string',
            'vrn' => 'nullable|string',
        ];
    }
}
