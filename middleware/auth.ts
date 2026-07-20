// Applied via `definePageMeta({ middleware: 'auth' })` on every
// authenticated route. Checks for the presence of the access-token cookie
// rather than verifying it (the API is the only party that needs to
// verify a JWT's signature — see Phase 4 §2.2); an expired/invalid token
// still gets past this middleware but is caught by the Apollo error link
// (plugins/apollo.ts), which redirects to /login on the resulting
// UNAUTHENTICATED error. This two-layer approach avoids duplicating JWT
// verification logic in the frontend.
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('ferrow_access_token');
  if (!token.value) {
    return navigateTo('/login');
  }
});
