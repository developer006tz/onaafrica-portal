<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddInvoiceRequest;
use App\Models\CompanyBranch;
use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $filterParams = [
            'search',
            'customer',
            'date',
            'branch',
            'status',
            'is_achieved',
            'company_branch_id',
        ];
        $invoices = Invoice::query()
            ->filter($request->only($filterParams))
            ->latest()
            ->paginate(1)
            ->withQueryString()
            ->through(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'invoice_type' => $invoice->invoice_type,
                    'issue_date' => $invoice->issue_date->format('d M Y'),
                    'sub_total' => $invoice->sub_total,
                    'vat_rate' => $invoice->vat_rate,
                    'vat_type' => $invoice->vat_type,
                    'vat_amount' => $invoice->vat_amount,
                    'total_amount' => $invoice->total_amount,
                    'delivery_timeline' => $invoice->delivery_timeline,
                    'payment_terms' => $invoice->payment_terms,
                    'delivery_location' => $invoice->delivery_location,
                    'company_branch' => $invoice->companyBranch->name,
                    'status' => $invoice->status,
                    'achieved' => $invoice->achieved,
                    'created_at' => $invoice->created_at->format('d M Y'),
                    'customer' => [
                        'id' => $invoice->customer->id,
                        'name' => $invoice->customer->name,
                        'phone' => $invoice->customer->phone,
                        'email' => $invoice->customer->email,
                        'address' => $invoice->customer->address,
                    ],
                    'created_by' => [
                        'id' => $invoice->createdBy->id,
                        'name' => $invoice->createdBy->name,
                        'email' => $invoice->createdBy->email,
                    ],
                    'invoice_items' => $invoice->invoiceItems->map(function ($item) {
                        return [
                            'item_description' => $item->item_description,
                            'unit_price' => $item->unit_price,
                            'quantity' => $item->quantity,
                            'amount' => $item->amount,
                        ];
                    }),
                    'items_count' => $invoice->invoiceItems->count(),
                ];
            });

        return Inertia::render('invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->only($filterParams),
        ]);
    }

    public function showInvoice($invoiceId)
    {
        $invoice = Invoice::findOrFail($invoiceId);

        return Inertia::render('invoices/show', [
            'invoice' => [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'invoice_type' => $invoice->invoice_type,
                'issue_date' => $invoice->issue_date->format('d M Y'),
                'sub_total' => $invoice->sub_total,
                'vat_rate' => $invoice->vat_rate,
                'vat_type' => $invoice->vat_type,
                'vat_amount' => $invoice->vat_amount,
                'total_amount' => $invoice->total_amount,
                'delivery_timeline' => $invoice->delivery_timeline,
                'payment_terms' => $invoice->payment_terms,
                'delivery_location' => $invoice->delivery_location,
                'company_branch' => $invoice->companyBranch->name,
                'status' => $invoice->status,
                'achieved' => $invoice->achieved,
                'created_at' => $invoice->created_at->format('d M Y'),
                'customer' => [
                    'id' => $invoice->customer->id,
                    'name' => $invoice->customer->name,
                    'phone' => $invoice->customer->phone,
                    'email' => $invoice->customer->email,
                    'address' => $invoice->customer->address,
                ],
                'created_by' => [
                    'id' => $invoice->createdBy->id,
                    'name' => $invoice->createdBy->name,
                    'email' => $invoice->createdBy->email,
                ],
                'invoice_items' => $invoice->invoiceItems->map(function ($item) {
                    return [
                        'item_description' => $item->item_description,
                        'unit_price' => $item->unit_price,
                        'quantity' => $item->quantity,
                        'amount' => $item->amount,
                    ];
                }),
                'items_count' => $invoice->invoiceItems->count(),
            ],
        ]);
    }

    public function createInvoice()
    {
        $customers = Customer::all();

        return Inertia::render('invoices/create', [
            'customers' => $customers,
            'companyBranches' => CompanyBranch::select('id', 'name')->get(),
        ]);
    }

    public function storeInvoice(AddInvoiceRequest $request)
    {
        DB::beginTransaction();
        $validated = $request->validated();
        $has_no_vat = $request->vat_type === 'none';

        try {
            $invoice = Invoice::create([
                'invoice_type' => $validated['invoice_type'],
                'issue_date' => $validated['issue_date'],
                'sub_total' => $validated['sub_total'],
                'vat_rate' => $has_no_vat ? null : $validated['vat_rate'],
                'vat_type' => $has_no_vat ? null : $validated['vat_type'],
                'vat_amount' => $has_no_vat ? null : $validated['vat_amount'],
                'total_amount' => $validated['total_amount'],
                'delivery_timeline' => $validated['delivery_timeline'],
                'payment_terms' => $validated['payment_terms'],
                'delivery_location' => $validated['delivery_location'],
                'customer_id' => $validated['customer_id'],
                'company_branch_id' => $validated['company_branch_id'],
                'status' => $validated['status'] ?? 'draft',
                'achieved' => $validated['achieved'] ?? 'no',
                'created_by' => auth()->id(),
            ]);

            foreach ($request->items as $item) {
                $invoice->invoiceItems()->create([
                    'item_description' => trim($item['item_description']),
                    'unit_price' => trim($item['unit_price']),
                    'quantity' => trim($item['quantity']),
                    'amount' => trim($item['amount']),
                ]);
            }

            \DB::commit();

            return redirect()->route('invoices.index')
                ->with('success', 'Invoice created successfully');

        } catch (\Exception $e) {
            \DB::rollBack();

            return back()->withErrors(['error' => 'Failed to create invoice: '.$e->getMessage()])
                ->withInput();
        }
    }

    public function listQuotes(Request $request)
    {
        $invoices = Invoice::query()
            ->where('invoice_type', 'performa')
            ->filter([
                'invoice_number' => $request->input('search'),
                'customer_id' => $request->input('customer'),
                'issue_date' => $request->input('date'),
                'company_branch_id' => $request->input('branch'),
                'status' => $request->input('status'),
                'is_achieved' => $request->input('is_achieved'),
            ]);
    }
}
