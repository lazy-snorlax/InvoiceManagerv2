<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyListResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyListController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Company::query()
            ->select('id', 'company_name')
            ->orderBy('company_name', 'asc')
            ->get();
        // dd($query->toArray());
        return collect($query);
        // return CompanyListResource::collection($query);
    }
}
