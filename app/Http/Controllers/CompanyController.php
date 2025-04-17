<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCompanyBranchRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use App\Models\CompanyBranch;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {

        return Inertia::render('settings/company', [
            'company' => Company::first(),
            'branches' => CompanyBranch::where('company_id', Company::first()->id)->get(),
        ]);
    }

    public function updateCompany(UpdateCompanyRequest $request, $companyId)
    {
        $company = Company::findOrFail($companyId);

        $validated = $request->validated();
        if ($request->hasFile('logo')) {
            $validated['logo'] = uploadFile($request->file('logo'));
        }

        $company->update($validated);

        return redirect()->back()->with('success', 'Company updated successfully');
    }

    public function updateCompanyBranch(UpdateCompanyBranchRequest $request, $companyBranchId)
    {
        $companyBranch = CompanyBranch::findOrFail($companyBranchId);
        $validated = $request->validated();
        if($request->has('phones')){
            /*phones comes in comma separated string but its json dataype in db
            so we need to convert it to array
            example: ["+255 757 333 555", "+255 711 400 200"]*/
            $validated['phones'] = json_encode($request->phones);
        }
        if ($request->hasFile('stamp')) {
            $validated['stamp'] = uploadFile($request->file('stamp'));
        }
        $companyBranch->update($validated);

        return redirect()->back()->with('success', $companyBranch->name.' updated successfully');

    }
}
