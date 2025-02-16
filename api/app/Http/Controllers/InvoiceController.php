<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\TransactionMain;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = TransactionMain::query()
            ->where('type', '=', 1)
            ->orderBy('id', 'desc')
            ->first();

        return new InvoiceResource($query->load('headers.lines'));
    }

    public function show(Request $request, TransactionMain $id)
    {
        abort_if($id->type != 1, 500, 'This is not an invoice!');
        return new InvoiceResource($id->load('headers.lines'));
    }
}
