<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'tin' => 'nullable|string|max:255',
            'vrn' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png|max:1024',
            'country' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The company name is required.',
            'name.max' => 'The company name cannot exceed 255 characters.',
            'tin.max' => 'The TIN cannot exceed 255 characters.',
            'vrn.max' => 'The VRN cannot exceed 255 characters.',
            'logo.image' => 'The logo must be an image.',
            'logo.mimes' => 'The logo must be a JPEG or PNG file.',
            'logo.max' => 'The logo cannot be larger than 1MB.',
        ];
    }
}
