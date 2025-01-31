<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class SuccessfulPasswordResetNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public function __construct()
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail(User $notifiable)
    {
        return (new MailMessage)
            ->subject(sprintf('%s | %s', 'Reset Password', config('app.name')))
            ->markdown('mail.successful_password_reset', [
                'username' => $notifiable->username,
            ]);
    }
}
