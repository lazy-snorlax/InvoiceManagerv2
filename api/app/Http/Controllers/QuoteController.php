<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\TransactionMain;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index(Request $request)
    {
        $query = TransactionMain::query()
            ->where('type', '=', 3)
            ->orderBy('id', 'desc')
            ->first();
        // dd($query);
        return new InvoiceResource($query->load('headers.lines'));
    }

    public function show(Request $request, TransactionMain $id)
    {
        abort_if($id->type != 3, 500, "This is not a quote!");
        return new InvoiceResource($id->load('headers.lines'));
    }
}