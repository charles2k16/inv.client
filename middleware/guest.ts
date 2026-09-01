// Applied to auth pages (login/register) so an already-logged-in investor
// is bounced straight to the dashboard instead of seeing the login form.
// Users who signed in but have not set a PIN yet go to /setup-pin.
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('ferrow_access_token');
  if (!token.value) return;

  const hasPin = useCookie('ferrow_has_pin').value === '1';
  return navigateTo(hasPin ? '/dashboard' : '/setup-pin');
});
