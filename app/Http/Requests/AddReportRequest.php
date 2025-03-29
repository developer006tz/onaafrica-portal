<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddReportRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'staff_id' => ['required', 'exists:users,id'],
            'customer_id' => ['required', 'exists:customers,id'],
            'property_id' => ['required', 'exists:properties,id'],
            'address' => ['nullable', 'string'],
            'customer_phones' => ['nullable', 'array'],
            'customer_phones.*' => ['nullable', 'string'],
            'time_from' => ['nullable', 'date_format:H:i'],
            'time_to' => ['nullable', 'date_format:H:i', 'after:time_from'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:COMPLETE,PENDING,CANCELLED'],
            'date' => ['nullable', 'date']
        ];
    }
}
