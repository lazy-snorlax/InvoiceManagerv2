<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\TransactionMain;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class InvoicePDFController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $invoice = TransactionMain::findOrFail($id)->load('headers.lines');
        $settings = $request->user()->businessSettings()->first();
        $company = Company::findOrFail($invoice->company_no);

        $logo = sprintf('data:image/png;base64,%s', base64_encode(Storage::get($settings->logo_path)));

        $data = [
            'settings' => $settings,
            'company' => $company,
            'invoice' => $invoice,
            'logo' => $logo,
        ];

        $pdf = PDF::loadView('pdf/invoice', $data);
        return $pdf->stream('invoice.pdf');
    }
}