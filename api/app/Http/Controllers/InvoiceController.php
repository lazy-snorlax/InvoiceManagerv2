<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\TransactionHeader;
use App\Models\TransactionLine;
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

    public function store(Request $request)
    {
        $invoice = new TransactionMain();
        $invoice->fill([
            'business_no' => $request->user()->businessSettings()->first()->id,
            'company_no' => $request->input('company'),
            'order_no' => $request->input('orderNo'),
            'note' => $request->input('note'),
            'date_issued' => $request->input('date_issued'),
        ]);
        $invoice->type = 1; // Save As Invoice
        $invoice->save();

        // Headers - update or create
        foreach ($request->input('transactions') as $headerData) {
            $header = $invoice->headers()->updateOrCreate(
                ['id' => array_key_exists("id", $headerData) ? $headerData['id'] : null],
                [
                    'transaction_main_id' => $invoice['id'],
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
        return new InvoiceResource($invoice->load(['headers.lines']));
    }

    public function update(Request $request, $id) 
    {
        $invoice = TransactionMain::findOrFail($id);
        $invoice->update([
            'business_no' => $request->user()->businessSettings()->first()->id,
            'company_no' => $request->input('company'),
            'order_no' => $request->input('orderNo'),
            'note' => $request->input('note'),
            'date_issued' => $request->input('date_issued'),
        ]);

        $updated_header_ids = [];
        $updated_line_ids = [];
        // Headers - update or create
        foreach ($request->input('transactions') as $headerData) {
            $header = $invoice->headers()->updateOrCreate(
                ['id' => array_key_exists("id", $headerData) ? $headerData['id'] : null],
                [
                    'transaction_main_id' => $invoice['id'],
                    'description' => $headerData['description']
                ],
            );
            $updated_header_ids[] = $header->id;
            // Lines - update or create
            foreach ($headerData['lines'] as $lineData) {
                $line = $header->lines()->updateOrCreate(
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
                $updated_line_ids[] = $line->id;
            }
        }

        // Delete lines not in update data
        TransactionLine::whereNotIn('id', $updated_line_ids)->delete();
        // Delete headers not in update data
        TransactionHeader::whereNotIn('id', $updated_header_ids)->delete();

        return new InvoiceResource($invoice->load(['headers.lines']));
    }
}
