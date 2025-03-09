<?php

namespace Tests\Unit\Models;

use App\Models\Company;
use App\Models\TransactionHeader;
use App\Models\TransactionLine;
use App\Models\TransactionMain;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

class QuoteTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanGetQuoteRecords() {
        $user = $this->createUser();

        $company = Company::factory()->create();
        TransactionMain::factory(5)->create([
            "type" => 3,
            "company_no" => $company->id,
        ]);

        $response = $this->be($user)->getJson('api/quote-list');

        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->count(5)
        ));
    }

    public function testUserCanGetLatestQuote() {
        $user = $this->createUser();

        $company = Company::factory()->create();
        $quote = TransactionMain::factory()->create([
            "type" => 3,
            "company_no" => $company->id,
        ]);
        $quote_header = TransactionHeader::factory()->create([
            "transaction_main_id" => $quote->id,
        ]);
        $quote_line = TransactionLine::factory()->create([
            "transaction_header_id" => $quote_header->id,
        ]);

        $response = $this->be($user)->getJson('api/invoices');

        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->has('id')
                ->where('business_no', $user->businessSettings()->first()->id)
                ->where('company', $company->id)
                ->where('type', 1)
                ->where('order_no', 123456)
                ->where('payment_no', null)
                ->where('payment_detail', null)
                ->where('paid', null)
                ->where('note', null)
                ->where('created_at', now()->format('Y-m-d'))
                ->has('transactions')
        ));
    }

    public function testUserCanGetSpecificQuote() {
        $user = $this->createUser();

        $company = Company::factory()->create();
        $quote = TransactionMain::factory()->create([
            "type" => 3,
            "company_no" => $company->id,
        ]);
        $quote_header = TransactionHeader::factory()->create([
            "transaction_main_id" => $quote->id,
        ]);
        $quote_line = TransactionLine::factory()->create([
            "transaction_header_id" => $quote_header->id,
        ]);

        $response = $this->be($user)->getJson('api/invoices/' . $quote->id);

        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->has('id')
                ->where('business_no', $user->businessSettings()->first()->id)
                ->where('company', $company->id)
                ->where('type', 1)
                ->where('order_no', null)
                ->where('payment_no', null)
                ->where('payment_detail', null)
                ->where('paid', null)
                ->where('note', null)
                ->where('created_at', now()->format('Y-m-d'))
                ->has('transactions')
        ));
    }

    public function testUserCanCreateQuote() {
        $user = $this->createUser();

        $company = Company::factory()->create();

        $response = $this->be($user)->postJson('api/quotes', [
            "company_no" => $company->id,
            "order_no" => 123456,
            "note" => null,
        ]);

        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->has('id')
                ->where('business_no', $user->businessSettings()->first()->id)
                ->where('company', $company->id)
                ->where('type', 1)
                ->where('order_no', 123456)
                ->where('payment_no', null)
                ->where('payment_detail', null)
                ->where('paid', null)
                ->where('note', null)
                ->where('created_at', now()->format('Y-m-d'))
                ->has('transactions')
        ));
    }

    // public function testUserCanUpdateQuoteWithNewLines() {
    //     $user = $this->createUser();

    //     $company = Company::factory()->create();
    //     $quote = TransactionMain::factory()->create([
    //         "type" => 1,
    //         "company_no" => $company->id,
    //     ]);
    //     $quote_header = TransactionHeader::factory()->create([
    //         "transaction_main_id" => $quote->id,
    //     ]);
    //     $quote_line = TransactionLine::factory()->create([
    //         "transaction_header_id" => $quote_header->id,
    //     ]);

    //     $response = $this->be($user)->putJson('api/quotes/' . $quote->id, [
            
    //     ]);

    //     $response->assertSuccessful();
    //     $response->assertJson(fn (AssertableJson $json) => $json
    //         ->has('data', fn (AssertableJson $json) => $json
    //             ->has('id')
    //             ->where('business_no', $user->businessSettings()->first()->id)
    //             ->where('company', $company->id)
    //             ->where('type', 1)
    //             ->where('order_no', 123456)
    //             ->where('payment_no', null)
    //             ->where('payment_detail', null)
    //             ->where('paid', null)
    //             ->where('note', null)
    //             ->where('created_at', now()->format('Y-m-d'))
    //             ->has('transactions')
    //     ));
    // }
}