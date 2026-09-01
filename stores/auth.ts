import { defineStore } from 'pinia';

type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  kycStatus: string;
  referralCode: string;
  hasPin: boolean;
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
    hasPin: (state) => {
      if (state.user) return state.user.hasPin;
      return useCookie('ferrow_has_pin').value === '1';
    },
  },
  actions: {
    setSession(user: CurrentUser, accessToken: string, refreshToken: string) {
      this.user = { ...user, hasPin: Boolean(user.hasPin) };
      const accessCookie = useCookie('ferrow_access_token', { maxAge: 60 * 60 * 24 * 2, sameSite: 'lax' });
      const refreshCookie = useCookie('ferrow_refresh_token', { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
      const hasPinCookie = useCookie('ferrow_has_pin', { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
      accessCookie.value = accessToken;
      refreshCookie.value = refreshToken;
      hasPinCookie.value = user.hasPin ? '1' : '0';
    },
    markPinSet() {
      if (this.user) this.user.hasPin = true;
      useCookie('ferrow_has_pin', { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' }).value = '1';
    },
    clearSession() {
      this.user = null;
      useCookie('ferrow_access_token').value = null;
      useCookie('ferrow_refresh_token').value = null;
      useCookie('ferrow_has_pin').value = null;
    },
  },
});
