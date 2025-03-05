<?php

namespace Tests;

use App\Models\BusinessSetting;
use App\Models\User;
use Silber\Bouncer\BouncerFacade;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;


    /**
     * Setup test case
     *
     * @return void
     */
    protected function setUp(): void
    {
        $this->setUpParallel();

        parent::setUp();

        $this->withoutMiddleware([ThrottleRequests::class]);
        $this->withHeaders(['referer' => env('APP_URL')]);

        // If method doesn't exist automatically verify two factor, otherwise check result of
        // method to determine if it should be verified or not.
        // phpcs:ignore
        if (!method_exists($this, 'shouldTwoFactorBeVerified') || $this->shouldTwoFactorBeVerified()) {
            $this->withTwoFactorVerified();
        }

        // Reset model results per page to 50.
        // Model::resultsPerPage(50);

        Storage::fake();
    }


    /**
     * Setup tests to run in parallel.
     *
     * @return void
     */
    protected function setUpParallel()
    {
        if (($parallel = getenv('TEST_TOKEN')) !== false) {
            putenv("DB_TESTING_DATABASE=testing_{$parallel}");
        }
    }

    /**
     * Create a user.
     */
    public function createUser(array $attributes = []): User
    {
        $user = User::factory()->user()->enabled()->create($attributes);
        BusinessSetting::factory()->create([
            'user_id' => $user->id,
        ]);
        return $user;
    }
}
