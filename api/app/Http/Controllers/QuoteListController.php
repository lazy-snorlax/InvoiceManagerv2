<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\TransactionMain;
use Illuminate\Http\Request;

class QuoteListController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = TransactionMain::query()
            ->select('id')
            ->where('type', '=', 3)
            ->orderBy('id', 'asc')
            ->get();
        // dd($query->toArray());
        return collect($query);
    }
}