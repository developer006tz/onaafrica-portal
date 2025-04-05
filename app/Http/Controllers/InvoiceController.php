<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddInvoiceRequest;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Customer;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $invoices = Invoice::query()
            ->filter([
                'invoice_number' => $request->input('search'),
                'customer_id' => $request->input('customer'),
                'issue_date' => $request->input('date'),
                'company_branch_id' => $request->input('branch'),
                'status' => $request->input('status'),
                'is_achieved' => $request->input('is_achieved'),

            ])
            ->when($request->filled('status'), function ($query) use ($request) {
                return $query->where('status', $request->status);
            })
            ->with(['customer', 'branch'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->all()
        ]);
    }

    public function showInvoice(Invoice $invoice)
    {
        $invoice->load(['customer', 'branch', 'items']);
        return Inertia::render('invoices/show', [
            'invoice' => $invoice,
        ]);
    }

    public function createInvoice()
    {
        $customers = Customer::all();
        return Inertia::render('invoices/create', [
            'customers' => $customers,
        ]);
    }

    public function storeInvoice(AddInvoiceRequest $request)
    {
        // Start a database transaction
        \DB::beginTransaction();

        try {
            // Create the invoice
            $invoice = Invoice::create([
                'invoice_type' => $request->invoice_type,
                'issue_date' => $request->issue_date,
                'sub_total' => $request->sub_total,
                'vat_rate' => $request->vat_rate,
                'vat_type' => $request->vat_type,
                'vat_amount' => $request->vat_amount,
                'total_amount' => $request->total_amount,
                'delivery_timeline' => $request->delivery_timeline,
                'payment_terms' => $request->payment_terms,
                'delivery_location' => $request->delivery_location,
                'customer_id' => $request->customer_id,
                'company_branch_id' => $request->company_branch_id,
                'status' => $request->status ?? 'draft',
                'achieved' => $request->achieved ?? 'no',
                'created_by' => auth()->id(),
            ]);

            // Create invoice items
            foreach ($request->items as $item) {
                $invoice->invoiceItems()->create([
                    'item_description' => $item['item_description'],
                    'unit_price' => $item['unit_price'],
                    'quantity' => $item['quantity'],
                    'amount' => $item['amount']
                ]);
            }

            \DB::commit();

            return redirect()->route('invoices.show', $invoice->id)
                ->with('success', 'Invoice created successfully');

        } catch (\Exception $e) {
            \DB::rollBack();
            return back()->withErrors(['error' => 'Failed to create invoice: ' . $e->getMessage()])
                ->withInput();
        }
    }
}
