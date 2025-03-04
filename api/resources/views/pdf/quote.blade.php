<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Invoice</title>
    <link href="{{ public_path('css/bootstrap.min.css') }}" rel="stylesheet" />
    <style>
        .content { margin-bottom: 100px; }
        .last { position: absolute; bottom: -25px; left: 0px; right: 0px; height: 100px; }
    </style>
</head>
<body>
    <page size="A4" class="page-break">
        <div class="content">
            <table width="100%" style="margin-bottom: 10px">
                <tr>
                    <td width="50%">
                        <img src="{{ $logo }}" width="362" height="203" alt="LOGO.png">
                        
                    </td>
                    <td style="text-align: center">
                        <h1 style="margin-bottom: 3px">QUOTE</h1>
                        <span style="font-style: italic;font-weight: bold;">{{ $settings->note1 }}</span> <br>
                        <span style="font-style: italic;font-weight: bold;">ABN: {{ $settings->abn }}</span>  <br>
                        <span style="font-style: italic;font-weight: bold;">{{ $settings->address }}</span> <br>
                        <span style="font-style: italic;font-weight: bold;">{{ $settings->city }}</span> <br>
                        <span style="font-style: italic;font-weight: bold;">{{ $settings->state }} {{$settings->post_code}}</span> <br>
                        <span style="font-style: italic;font-weight: bold;">Mobile {{ $settings->mobile }}</span>
                    </td>
                </tr>
            </table>

            <table width="100%" style="margin-bottom: 10px;">
                <tr>
                    <td width="50%">
                        <table width="100%">
                            <tr>
                                <th style="vertical-align: top;">
                                    <span style="font-size: 10pt;">To:</span>
                                </th>
                                <td width="75%" style="border: solid 1px gray;font-size: 10pt; padding: left 5px;">
                                    <span>{{ $company->company_name }} <br> </span>
                                    <span>{{ $company->postal_address }} <br></span>
                                    <span>{{ $company->postal_city }} <br></span>
                                    <span>{{ $company->postal_state }} </span>
                                    <span style="text-align: right">{{ $company->postal_post_code }} </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td width="10%"></td>
                    <td>
                        <table width="100%">
                            <tr>
                                <th style="padding: left 5px; text-align: right">Date: </th>
                                <td style="border: solid 1px gray;text-align: center">{{ $quote->created_at->format('d M Y') }}</td>
                            </tr>
                            <tr>
                                <th style="padding: left 5px; text-align: right">Quote No: </th>
                                <td style="border: solid 1px gray;text-align: center">{{ $quote->id }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            @php
                $invSubTotal = 0;
                $invGST = 0;
                $invTotal = 0;
            @endphp
            <table width="100%">
                <tr>
                    <th style="border-bottom: solid 2px black;border-top: solid 1px black; width: 10%">Items</th>
                    <th style="border-bottom: solid 2px black;border-top: solid 1px black; width: 60%">Description</th>
                    <th style="border-bottom: solid 2px black;border-top: solid 1px black; width: 15%">GST</th>
                    <th style="border-bottom: solid 2px black;border-top: solid 1px black; width: 15%">Amount</th>
                </tr>
                @foreach ($quote->headers as $head)
                    <tr>
                        <td colspan="4" style="border-bottom: dotted 1px black;">{{ $head->description }}</td>
                    </tr>
                    @php
                        $subtotal = 0;
                        $subGST = 0;
                    @endphp
                    @foreach ($head->lines as $line)
                        <tr style="margin-top: 20px;">
                            <td style="text-align: center">{{$line->item}}</td>
                            <td>{{$line->description}}</td>
                            <td style="text-align: right; padding:0 10px;">${{ number_format($line->gst, 2) }}</td>
                            <td style="text-align: right; padding:0 10px;">${{ number_format($line->cost, 2) }}</td>
                        </tr>
                        @php
                            $subtotal = $subtotal + $line->cost;
                            $subGST = $subGST + $line->gst;
                        @endphp
                    @endforeach
                    <tr>
                        <td colspan="5" style="border-bottom: dotted 1px black">
                            <table style="border-top: dotted 1px black;margin-left: auto; width: 75%">
                                <tr>
                                    <th>Sub Total: </th>
                                    <td>${{ number_format($subtotal, 2) }}</td>
                                    <th>GST: </th>
                                    <td>${{ number_format($subGST, 2) }}</td>
                                    <th>Item Total:</th>
                                    <td>${{ number_format($subtotal + $subGST, 2) }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @php
                        $invSubTotal = $invSubTotal + $subtotal;
                        $invGST = $invGST + $subGST;
                        $invTotal = $invTotal + ($subtotal + $subGST);
                    @endphp
                @endforeach
            </table>
        </div>
        <div class="last">
            <div style="border-top: solid 1px gray"></div>
            <table style="width: 100%; margin-top: 2px">
                <tr>
                    <td width="60%">
                        {{ $settings->note2 }}
                    </td>
                    <td>
                        <table style="width: 100%;">
                            <tr>
                                <th style="padding: left 5px; text-align: right; width: 50%">Sub Total:</th>
                                <td style="border: solid 1px gray;text-align: center">${{ number_format($invSubTotal, 2) }}</td>
                            </tr>
                            <tr>
                                <th style="padding: left 5px; text-align: right">GST:</th>
                                <td style="border: solid 1px gray;text-align: center">${{ number_format($invGST, 2) }}</td>
                            </tr>
                            <tr>
                                <th style="padding: left 5px; text-align: right">Grand Total:</th>
                                <td style="border: solid 1px gray;text-align: center">${{ number_format($invTotal, 2) }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

    </page>    
</body>
</html>