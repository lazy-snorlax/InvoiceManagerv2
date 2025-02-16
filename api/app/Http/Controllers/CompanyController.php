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
}