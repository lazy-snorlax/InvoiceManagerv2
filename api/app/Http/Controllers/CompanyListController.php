<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyListController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Company::query()
            ->select('id')
            ->orderBy('id', 'asc')
            ->get();
        // dd($query->toArray());
        return collect($query);
    }
}
