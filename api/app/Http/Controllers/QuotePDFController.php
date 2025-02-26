<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\TransactionMain;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class QuotePDFController extends Controller
{
    public function __invoke(Request $request, $id)
    {
        $quote = TransactionMain::findOrFail($id)->load('headers.lines');
        $settings = $request->user()->businessSettings()->first();
        $company = Company::findOrFail($quote->company_no);

        $logo = sprintf('data:image/png;base64,%s', base64_encode(Storage::get($settings->logo_path)));

        $data = [
            'settings' => $settings,
            'company' => $company,
            'quote' => $quote,
            'logo' => $logo,
        ];

        $pdf = PDF::loadView('pdf/quote', $data);
        return $pdf->stream('quote.pdf');
    }
}