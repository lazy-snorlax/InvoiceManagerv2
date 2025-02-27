<?php

namespace App\Http\Controllers;

use App\Http\Resources\CSVListResource;
use App\Models\TransactionMain;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use League\Csv\Writer;
use SplTempFileObject;

use function PHPSTORM_META\map;

class InvoiceReportController extends Controller
{
    public function __invoke(Request $request)
    {
        $range = $request->query('q');
        $start = $request->query('start');
        $end = $request->query('end');
        
        $invoices = TransactionMain::query()
        ->where('type', '=', 1)
        ->orderBy('created_at', 'asc')
        ->when($range != "null", function ($q) use ($range) {
            $q->whereBetween('created_at', [date('Y-m-d', strtotime('-1 '. $range)), date('Y-m-d')]);
        })
        ->when($start, function ($q) use ($start, $end) {
            $q->whereBetween('created_at', [$start, $end ?? date('Y-m-d')]);
        })
        ->get();
        
        foreach ($invoices as $invoice) {
            $total_gst = 0;
            $total_cost = 0;
            foreach ($invoice->headers()->get() as $header) {
                $total_gst += $header->lines()->sum('gst');
                $total_cost += $header->lines()->sum('cost');
            }
            $invoice->total_gst = $total_gst;
            $invoice->total_cost = $total_cost;
            $invoice->total = $total_cost + $total_gst;
        }

        $csv = Writer::createFromFileObject(new SplTempFileObject);
        $csv->insertOne([
            'Date',
            'Company',
            'Cost',
            'GST',
            'Total',
        ]);

        $csv->insertAll($invoices->map(function ($invoice) {
            return [
                $invoice->created_at->format('Y-m-d'),
                $invoice->company()->first()->company_name,
                $invoice->total_cost,
                $invoice->total_gst,
                $invoice->total,
            ];
        }));

        return new Response($csv->toString(), 200, [
            'Content-Encoding' => 'none',
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="Sales Report.csv"',
            'Content-Description' => 'File Transfer',
        ]);
    }
}