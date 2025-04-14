<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class storeStaffRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'string', 'max:255'],
            'staff_number' => ['nullable', 'string', 'max:50', 'unique:users'],
            'role_id' => ['required', 'exists:roles,id'],
            'photo' => ['nullable', 'file', 'image', 'max:4096'],
        ];
    }

    /**
     * Get custom error messages for validator failures.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The staff name is required.',
            'name.string' => 'The name must be a text string.',
            'name.max' => 'The name cannot exceed 255 characters.',

            'email.required' => 'A valid email address is required.',
            'email.email' => 'Please enter a valid email address format.',
            'email.max' => 'The email address cannot exceed 255 characters.',
            'email.unique' => 'This email address is already registered in our system.',

            'phone.required' => 'A contact phone number is required.',
            'phone.string' => 'The phone number must be a text string.',
            'phone.max' => 'The phone number cannot exceed 255 characters.',

            'staff_number.max' => 'The staff number cannot exceed 50 characters.',
            'staff_number.unique' => 'This staff number is already assigned to another user.',

            'role_id.required' => 'Please select a role for the staff member.',
            'role_id.exists' => 'The selected role is invalid.',

            'photo.file' => 'The photo must be a valid file.',
            'photo.image' => 'The uploaded file must be an image.',
            'photo.max' => 'The photo size must not exceed 4MB.',
        ];
    }
}
