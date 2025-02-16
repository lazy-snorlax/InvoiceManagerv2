<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\TransactionMain;
use Illuminate\Http\Request;

class InvoiceListController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = TransactionMain::query()
            ->select('id')
            ->where('type', '=', 1)
            ->orderBy('id', 'asc')
            ->get();
        // dd($query->toArray());
        return collect($query);
    }
}
