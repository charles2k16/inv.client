// Applied to auth pages (login/register) so an already-logged-in investor
// is bounced straight to the dashboard instead of seeing the login form.
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('ferrow_access_token');
  if (token.value) {
    return navigateTo('/dashboard');
  }
});
