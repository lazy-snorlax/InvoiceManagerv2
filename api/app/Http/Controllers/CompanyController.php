<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $query = Company::query()->first();
        return new CompanyResource($query->load('accountType'));
    }

    public function show(Request $request, Company $id)
    {
        return new CompanyResource($id->load('accountType'));
    }

    public function store(Request $request)
    {
        $company = new Company();
        $company->fill($request->only([
            "abn",
            "company_name",
            "contact_name",
            "email",
            "mobile",
            "phone",
            "location_address",
            "location_city",
            "location_post_code",
            "location_state",
            "postal_address",
            "postal_city",
            "postal_post_code",
            "postal_state",
        ]));
        $company->save();

        return new CompanyResource($company->load('accountType'));
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $company->update($request->only([
            "abn",
            "company_name",
            "contact_name",
            "email",
            "mobile",
            "phone",
            "location_address",
            "location_city",
            "location_post_code",
            "location_state",
            "postal_address",
            "postal_city",
            "postal_post_code",
            "postal_state",
        ]));
        return new CompanyResource($company->load('accountType'));
    }
}