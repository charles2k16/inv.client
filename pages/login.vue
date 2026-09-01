<template>
  <div>
    <h1 class="font-display text-2xl font-bold">Welcome back</h1>
    <p class="mt-1.5 text-sm font-medium text-ink/55">
      {{ mode === 'pin' ? 'Log in with your mobile number and 6-digit PIN.' : 'First-time setup — use your password, then create a PIN.' }}
    </p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput
        v-model="mobileNumber"
        label="Mobile number"
        type="tel"
        inputmode="tel"
        placeholder="+233 24 123 4567"
        :error="fieldError('mobileNumber')"
      />

      <AppInput
        v-if="mode === 'pin'"
        v-model="pin"
        label="6-digit PIN"
        type="password"
        inputmode="numeric"
        :maxlength="6"
        placeholder="••••••"
        :error="fieldError('pin')"
      />
      <AppInput
        v-else
        v-model="password"
        label="Password"
        type="password"
        :error="fieldError('password')"
      />

      <div class="flex justify-between text-xs">
        <button type="button" class="text-forest hover:underline" @click="toggleMode">
          {{ mode === 'pin' ? 'First time? Use password' : 'Have a PIN? Log in with PIN' }}
        </button>
        <NuxtLink v-if="mode === 'pin'" to="/forgot-pin" class="text-forest hover:underline">Forgot PIN?</NuxtLink>
      </div>

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="loading">{{ mode === 'pin' ? 'Log in' : 'Continue' }}</AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-ink/55">
      New to Ferrow?
      <NuxtLink to="/register" class="font-bold font-medium text-forest hover:underline">Create an account</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { LOGIN, LOGIN_WITH_PIN } from '~/graphql/auth';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const route = useRoute();
const mode = ref<'pin' | 'password'>(route.query.setup === '1' ? 'password' : 'pin');
const mobileNumber = ref('');
const pin = ref('');
const password = ref('');
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const { mutate: loginWithPassword } = useMutation(LOGIN);
const { mutate: loginWithPin } = useMutation(LOGIN_WITH_PIN);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

function toggleMode() {
  mode.value = mode.value === 'pin' ? 'password' : 'pin';
  formError.value = '';
  errors.value = [];
}

async function submit() {
  errors.value = [];
  formError.value = '';
  loading.value = true;
  try {
    const result =
      mode.value === 'pin'
        ? await loginWithPin({ input: { mobileNumber: mobileNumber.value, pin: pin.value } })
        : await loginWithPassword({ input: { mobileNumber: mobileNumber.value, password: password.value } });

    const payload = mode.value === 'pin' ? result?.data?.loginWithPin : result?.data?.login;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not log in.';
      if (payload?.errors?.some((e: { code?: string }) => e.code === 'PIN_NOT_SET')) {
        mode.value = 'password';
      }
      return;
    }

    authStore.setSession(payload.user, payload.accessToken, payload.refreshToken);
    await navigateTo(payload.user.hasPin ? '/dashboard' : '/setup-pin');
  } catch {
    formError.value = 'Something went wrong. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
