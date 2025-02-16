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
        Schema::create('transaction_main', function (Blueprint $table) {
            $table->id();
            $table->integer('business_no')->nullable();
            $table->string('type')->nullable();
            $table->integer('company_no')->nullable();
            $table->string('order_no', 20)->nullable();
            $table->string('payment_no', 15)->nullable();
            $table->string('payment_detail', 50)->nullable();
            $table->boolean('paid')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
        
        Schema::create('transaction_headers', function (Blueprint $table) {
            $table->id();
            $table->integer('transaction_main_id')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('transaction_lines', function (Blueprint $table) {
            $table->id();
            $table->integer('transaction_header_id')->nullable();
            $table->integer('item')->nullable();
            $table->string('description')->nullable();
            $table->decimal('tax')->default(0.1)->nullable();
            $table->decimal('gst')->nullable();
            $table->decimal('cost')->nullable();
            $table->string('expense')->default('SALES')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_lines');
        Schema::dropIfExists('transaction_headers');
        Schema::dropIfExists('transaction_main');
    }
};
