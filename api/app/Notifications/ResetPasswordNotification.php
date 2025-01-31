<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $token;

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail(User $notifiable)
    {
        return (new MailMessage)
            ->subject(sprintf('%s | %s', 'Reset Password', config('app.name')))
            ->markdown('mail.reset_password', [
                'username' => $notifiable->username,
                'url' => config('app.frontend_url') . (sprintf(
                        '/set-password/%s?email=%s',
                        $this->token,
                        rawurlencode($notifiable->email)
                    ))
            ]);
    }
}