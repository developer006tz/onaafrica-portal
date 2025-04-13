<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCompanyBranchRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use App\Models\CompanyBranch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
 
        return Inertia::render('settings/company',[
            'company' => Company::first(),
            'branches' => CompanyBranch::where('company_id', Company::first()->id)->get(),
        ]);
    }

    public function updateCompany(UpdateCompanyRequest $request,  $companyId)
    {
        $company = Company::findOrFail($companyId);
        $validated = $request->validated();
        $company->update($validated);
        return redirect()->back()->with('success', 'Company updated successfully');
    }

    public function updateCompanyBranch(UpdateCompanyBranchRequest $request, $companyBranchId)
    {
        $companyBranch = CompanyBranch::findOrFail($companyBranchId);
        $validated = $request->validated();
        $companyBranch->update($validated);
        return redirect()->back()->with('success', 'Company Branch updated successfully');
        
    }
}
