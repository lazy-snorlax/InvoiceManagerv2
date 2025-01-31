@component('mail::message')
# Reset Password
<br>
You are receiving this email because someone has requested a password reset for your account.
<br/>
<br/>
You can use the link below to set a new password.
<br/>
<br/>
@component('mail::button', ['url' => $url])
Reset Password
@endcomponent
<br/>
<br/>
If you did not request a password reset you can ignore this email.
@endcomponent