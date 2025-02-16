<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('abn')->nullable();
            $table->string('account_type')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('mobile')->nullable();
            $table->string('location_address')->nullable();
            $table->string('location_city')->nullable();
            $table->string('location_state')->nullable();
            $table->string('location_post_code')->nullable();
            $table->string('postal_address')->nullable();
            $table->string('postal_city')->nullable();
            $table->string('postal_state')->nullable();
            $table->string('postal_post_code')->nullable();
            $table->timestamps();
        });

        Schema::create('credit_types', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->integer('days')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_types');
        Schema::dropIfExists('companies');
    }
};
