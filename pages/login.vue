<template>
  <div>
    <h1 class="font-display text-2xl font-bold">Welcome back</h1>
    <p class="mt-1.5 text-sm text-ink/55 font-medium">Log in with your mobile number.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput
        v-model="mobileNumber"
        label="Mobile number"
        type="tel"
        inputmode="tel"
        placeholder="+233 24 123 4567"
        :error="fieldError('mobileNumber')"
      />
      <AppInput v-model="password" label="Password" type="password" :error="fieldError('password')" />

      <div class="text-right">
        <NuxtLink to="/forgot-password" class="text-xs text-forest hover:underline">Forgot password?</NuxtLink>
      </div>

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="loading">Log in</AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-ink/55">
      New to Ferrow?
      <NuxtLink to="/register" class="font-medium text-forest hover:underline font-bold">Create an account</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { LOGIN } from '~/graphql/auth';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const mobileNumber = ref('');
const password = ref('');
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const { mutate: login } = useMutation(LOGIN);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

async function submit() {
  errors.value = [];
  formError.value = '';
  loading.value = true;
  try {
    const result = await login({ input: { mobileNumber: mobileNumber.value, password: password.value } });
    const payload = result?.data?.login;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not log in.';
      return;
    }
    authStore.setSession(payload.user, payload.accessToken, payload.refreshToken);
    await navigateTo('/dashboard');
  } catch (err: any) {
    formError.value = 'Something went wrong. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
