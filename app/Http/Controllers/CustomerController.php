<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {

        $filterParams = [
            'search',
            'name',
            'email',
            'phone',
        ];

        return Inertia::render('customers/index', [
            'filters' => $request->only($filterParams),
            'customers' => Customer::filter($request->only($filterParams))
                ->paginate($request->per_page ?? 10)
                ->withQueryString()
                ->through(function ($customer) {
                    return [
                        'id' => $customer->id,
                        'name' => $customer->name,
                        'email' => $customer->email,
                        'phone' => $customer->phone,
                        'contact_person' => $customer->contact_person,
                        'created_by' => $customer->createdBy?->name ?? null,
                        'created_at' => $customer->created_at,
                    ];
                }),

        ]);

    }

    public function addCustomer(Request $request)
    {
        return Inertia::render('customers/add', [

        ]);

    }

    public function storeCustomer(AddCustomerRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = $request->user()->id;
        $validated['name'] = ucwords(strtolower($request->name));

        Customer::create($validated);

        return redirect()->back()->with('success', 'customer created successfully');

    }

    public function deleteCustomer(Request $request) {}

    public function editCustomer($customerId)
    {
        $customer = Customer::findOrFail($customerId);

        return Inertia::render('customers/edit', [
            'customer' => $customer,
        ]);
    }

    public function updateCustomer(UpdateCustomerRequest $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validated();

        $validated['name'] = ucwords(strtolower($request->name));

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
    }
}
