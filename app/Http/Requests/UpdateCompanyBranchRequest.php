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
            'phones' => 'nullable|array',
            'phones.*' => 'string',
            'city' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'contact_person' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:255',
            'stamp' => 'nullable|string|max:255',
            'company_id' => 'required|string|exists:companies,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The branch name is required.',
            'address.required' => 'The branch address is required.',
            'city.required' => 'The city is required.',
            'email.email' => 'Please provide a valid email address.',
            'phones.array' => 'Phone numbers must be provided as an array.',
            'phones.*.string' => 'Each phone number must be a string.',
            'company_id.required' => 'The company ID is required.',
            'company_id.exists' => 'The selected company does not exist.',
        ];
    }
}
