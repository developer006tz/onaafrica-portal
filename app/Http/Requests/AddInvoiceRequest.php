<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddInvoiceRequest extends FormRequest
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
            'invoice_type' => 'required|in:performa,invoice',
            'issue_date' => 'required|date',
            'sub_total' => 'required|numeric|min:0',
            'vat_rate' => 'nullable|numeric|min:0',
            'vat_type' => 'nullable|in:inclusive,exclusive,none',
            'vat_amount' => 'nullable|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'delivery_timeline' => 'nullable|string',
            'payment_terms' => 'nullable|string',
            'delivery_location' => 'nullable|string',
            'status' => 'sometimes|in:draft,sent,paid,overdue,void',
            'achieved' => 'sometimes|in:yes,no',
            'customer_id' => 'required|exists:customers,id',
            'company_branch_id' => 'required|exists:company_branches,id',

            // Invoice items validation
            'items' => 'required|array|min:1',
            'items.*.item_description' => 'required|string',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.amount' => 'required|numeric|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'items.required' => 'At least one invoice item is required',
            'items.min' => 'At least one invoice item is required',
            'items.*.item_description.required' => 'Item description is required',
            'items.*.unit_price.required' => 'Unit price is required',
            'items.*.quantity.required' => 'Quantity is required',
            'items.*.amount.required' => 'Amount is required',
        ];
    }
}
