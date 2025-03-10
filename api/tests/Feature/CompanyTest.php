<?php

namespace Tests\Unit\Models;

use App\Models\Company;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanGetCompanyRecords() {
        $user = $this->createUser();

        Company::factory(5)->create();
        $response = $this->be($user)->getJson('api/company-list');
        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->count(5)
        ));
    }

    public function testUserCanGetSingleCompany()
    {
        $user = $this->createUser();
        $company = Company::factory()->create();

        $response = $this->be($user)->getJson('api/companies/'.$company->id);
        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->where('id', $company->id)
                ->where('company_name', $company->company_name)
                ->where('contact_name', $company->contact_name)
                ->where('abn', $company->abn)
                ->where('email', $company->email)
                ->where('phone', $company->phone)
                ->where('mobile', $company->mobile)
                ->where('location_address', $company->location_address)
                ->where('location_city', $company->location_city)
                ->where('location_state', $company->location_state)
                ->where('location_post_code', $company->location_post_code)
                ->where('postal_address', $company->postal_address)
                ->where('postal_city', $company->postal_city)
                ->where('postal_state', $company->postal_state)
                ->where('postal_post_code', $company->postal_post_code)
        ));
    }

    public function testUserCanStoreNewCompanyDetails()
    {
        $user = $this->createUser();

        $companyData = [
            "abn" => '123654789',
            "company_name" => 'Test Company',
            "contact_name" => 'Testy McTester',
            "email" => 'test@test.io',
            "mobile" => '0412345622',
            "phone" => null,
            "location_address" => '123 Fake Street',
            "location_city" => 'Adelaide',
            "location_post_code" => '5000',
            "location_state" => 'SA',
            "postal_address" => '500 North Terrace',
            "postal_city" => 'Adelaide',
            "postal_post_code" => '5000',
            "postal_state" => 'SA',
        ];
        $response = $this->be($user)->postJson('api/companies', $companyData);
        $response->assertSuccessful();
        $response->assertJson(fn (AssertableJson $json) => $json
            ->has('data', fn (AssertableJson $json) => $json
                ->has('id')
                ->where('company_name', $companyData['company_name'])
                ->where('contact_name', $companyData['contact_name'])
                ->where('abn', $companyData['abn'])
                ->where('email', $companyData['email'])
                ->where('phone', $companyData['phone'])
                ->where('mobile', $companyData['mobile'])
                ->where('location_address', $companyData['location_address'])
                ->where('location_city', $companyData['location_city'])
                ->where('location_state', $companyData['location_state'])
                ->where('location_post_code', $companyData['location_post_code'])
                ->where('postal_address', $companyData['postal_address'])
                ->where('postal_city', $companyData['postal_city'])
                ->where('postal_state', $companyData['postal_state'])
                ->where('postal_post_code', $companyData['postal_post_code'])
        ));
    }
}