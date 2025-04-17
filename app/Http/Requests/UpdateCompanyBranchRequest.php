<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyBranchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'address_two' => 'nullable|string',
            'phones' => 'nullable|string',
            'city' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:255',
            'stamp' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The branch name is required.',
            'address.required' => 'The branch address is required.',
            'city.required' => 'The city is required.',
            'email.email' => 'Please provide a valid email address.',
            'stamp.image' => 'The stamp must be an image.',
           'stamp.mimes' => 'The stamp must be a file of type: jpeg, jpg, png.',
           'stamp.max' => 'The stamp may not be greater than 2048 kilobytes.',
        ];
    }
}
