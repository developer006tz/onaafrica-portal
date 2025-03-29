<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddReportRequest;
use App\Models\DailyReport;
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
                ->paginate($request->per_page ?? 10)
                ->withQueryString()
                ->through(function ($report) {
                    return [
                        'id' => $report->id,
                        'date' => $report->date,
                        'customer' => $report->customer->name,
                        'address' => $report->address,
                        'status' => $report->status
                    ];
                })
        ]);

    }
    public function addReport()
    {
        return Inertia::render('reports/add', [

        ]);
    }

    public function storeReport(AddReportRequest $request)
    {
        $validated = $request->validated();

        // Set staff_id to current user if not provided
        if (!isset($validated['staff_id'])) {
            $validated['staff_id'] = $request->user()->id;
        }

        // Create the daily report
        $report = DailyReport::create($validated);

        return redirect()->route('reports.index')
            ->with('success', 'Report added successfully');
    }
}
