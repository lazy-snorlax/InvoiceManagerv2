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

    public function store(Request $request)
    {
        $quote = new TransactionMain();
        $quote->fill([
            'business_no' => $request->user()->businessSettings()->first()->id,
            'company_no' => $request->input('company'),
            'order_no' => $request->input('orderNo'),
            'note' => $request->input('note'),
        ]);
        $quote->type = 3;
        $quote->save();

        // Headers - update or create
        foreach ($request->input('transactions') as $headerData) {
            $header = $quote->headers()->updateOrCreate(
                ['id' => array_key_exists("id", $headerData) ? $headerData['id'] : null],
                [
                    'transaction_main_id' => $quote['id'],
                    'description' => $headerData['description']
                ],
            );
            // Lines - update or create
            foreach ($headerData['lines'] as $lineData) {
                $header->lines()->updateOrCreate(
                    ['id' => array_key_exists("id", $lineData) ? $lineData['id'] : null],
                    [
                        'transaction_header_id' => $header['id'],
                        'description' => $lineData['description'],
                        'item' => $lineData['item'],
                        'tax' => $lineData['tax'] / 100,
                        'gst' => $lineData['cost'] * ($lineData['tax'] / 100),
                        'cost' => $lineData['cost'],
                        'expense' => $lineData['expense']
                    ]
                );
            }
        }
        return new InvoiceResource($quote->load(['headers.lines']));
    }

    public function update(Request $request, $id)
    {
        $quote = TransactionMain::findOrFail($id);
        $quote->update([
            'business_no' => $request->user()->businessSettings()->id,
            'company_no' => $request->input('company'),
            'order_no' => $request->input('orderNo'),
            'note' => $request->input('note'),
        ]);

        // Headers - update or create
        foreach ($request->input('transactions') as $headerData) {
            $header = $quote->headers()->updateOrCreate(
                ['id' => array_key_exists("id", $headerData) ? $headerData['id'] : null],
                [
                    'transaction_main_id' => $quote['id'],
                    'description' => $headerData['description']
                ],
            );
            // Lines - update or create
            foreach ($headerData['lines'] as $lineData) {
                $header->lines()->updateOrCreate(
                    ['id' => array_key_exists("id", $lineData) ? $lineData['id'] : null],
                    [
                        'transaction_header_id' => $header['id'],
                        'description' => $lineData['description'],
                        'item' => $lineData['item'],
                        'tax' => $lineData['tax'] / 100,
                        'gst' => $lineData['cost'] * ($lineData['tax'] / 100),
                        'cost' => $lineData['cost'],
                        'expense' => $lineData['expense']
                    ]
                );
            }
        }
        return new InvoiceResource($quote->load(['headers.lines']));
    }
}