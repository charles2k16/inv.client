import { defineStore } from 'pinia';

type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  kycStatus: string;
  referralCode: string;
};

// Deliberately thin: tokens live in cookies (readable on both server and
// client, needed since /login is SSR per nuxt.config.ts), and this store
// only holds the display-friendly user snapshot returned at login. `me`
// (graphql/auth.ts) is the source of truth on any page that needs fresher
// data than what login returned.
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as CurrentUser | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''),
  },
  actions: {
    setSession(user: CurrentUser, accessToken: string, refreshToken: string) {
      this.user = user;
      const accessCookie = useCookie('ferrow_access_token', { maxAge: 60 * 60 * 24 * 2, sameSite: 'lax' });
      const refreshCookie = useCookie('ferrow_refresh_token', { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
      accessCookie.value = accessToken;
      refreshCookie.value = refreshToken;
    },
    clearSession() {
      this.user = null;
      useCookie('ferrow_access_token').value = null;
      useCookie('ferrow_refresh_token').value = null;
    },
  },
});
