<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddReportRequest;
use App\Models\Customer;
use App\Models\DailyReport;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $filterParams = [
            'date',
            'search',
            'customer_id',
        ];

        return Inertia::render('reports/index', [
            'reports' => DailyReport::filter($request->only($filterParams))
                ->where('date', date('Y-m-d'))
                ->orderBy('created_at', 'desc')
                ->paginate($request->per_page ?? 10)
                ->withQueryString()
                ->through(function ($report) {
                    return [
                        'id' => $report->id,
                        'reference_number' => $report->reference_number,
                        'description' => $report->description,
                        'time_from' => $report->time_from,
                        'time_to' => $report->time_to,
                        'date' => $report->date,
                        'customer' => $report->customer->name,
                        'property_type' => $report->property->name,
                        'address' => $report->address,
                        'status' => $report->status,
                    ];
                }),
            'previousReports' => DailyReport::where('date', '<', date('Y-m-d'))
                ->orderBy('date', 'desc')
                ->take(3)
                ->get()
                ->map(function ($report) {
                    return [
                        'id' => $report->id,
                        'reference_number' => $report->reference_number,
                        'description' => $report->description,
                        'time_from' => $report->time_from,
                        'time_to' => $report->time_to,
                        'date' => $report->date,
                        'customer' => $report->customer->name,
                        'property_type' => $report->property->name,
                        'address' => $report->address,
                        'status' => $report->status,
                    ];
                }),
        ]);

    }

    public function addReport(Request $request)
    {
        $filterParams = [
            'name',
        ];

        return Inertia::render('reports/add', [
            'customers' => Customer::filter($request->only($filterParams))
                ->select('id', 'name')
                ->get(),
            'properties' => Property::filter($request->only($filterParams))
                ->select('id', 'name')
                ->get(),
            'filters' => $request->only($filterParams),
        ]);
    }

    public function storeReport(AddReportRequest $request)
    {
        $validated = $request->validated();

        $validated['staff_id'] = $request->user()->id;

        DailyReport::create($validated);

        return redirect()->route('reports.index')
            ->with('success', 'Report added successfully');
    }

    public function allStaffReports(Request $request)
    {
        $filterParams = [
            'date',
            'search',
            'customer_id',
        ];

        return Inertia::render('reports/all', [
            'reports' => DailyReport::filter($request->only($filterParams))
                ->where('staff_id', $request->staff_id)
                ->orderBy('created_at', 'desc')
                ->paginate($request->per_page ?? 10)
                ->withQueryString()
                ->through(function ($report) {
                    return [
                        'id' => $report->id,
                        'reference_number' => $report->reference_number,
                        'description' => $report->description,
                        'time_from' => $report->time_from,
                        'time_to' => $report->time_to,
                        'date' => $report->date,
                        'customer' => $report->customer->name,
                        'property_type' => $report->property->name,
                        'address' => $report->address,
                        'status' => $report->status,
                    ];
                }),
        ]);
    }
}
