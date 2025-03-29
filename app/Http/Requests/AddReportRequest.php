<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddReportRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'exists:customers,id'],
            'property_id' => ['required', 'exists:properties,id'],
            'address' => ['required', 'string'],
            'customer_phones' => ['nullable', 'array'],
            'customer_phones.*' => ['nullable', 'string'],
            'time_from' => ['nullable', 'date_format:H:i'],
            'time_to' => ['nullable', 'date_format:H:i', 'after:time_from'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:COMPLETE,PENDING,CANCELLED'],
            'date' => ['required', 'date']
        ];
    }
}
