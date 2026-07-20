<template>
  <div>
    <h1 class="font-display text-2xl">Forgot password</h1>
    <p class="mt-1.5 text-sm text-ink/55">We'll send a code to your mobile number.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput v-model="mobileNumber" label="Mobile number" type="tel" inputmode="tel" placeholder="+233 24 123 4567" :error="error" />
      <AppButton type="submit" :loading="loading">Send code</AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-ink/55">
      <NuxtLink to="/login" class="font-medium text-forest hover:underline">Back to log in</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { FORGOT_PASSWORD } from '~/graphql/auth';

definePageMeta({ layout: 'auth' });

const mobileNumber = ref('');
const error = ref('');
const loading = ref(false);
const { mutate: forgotPassword } = useMutation(FORGOT_PASSWORD);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    const result = await forgotPassword({ mobileNumber: mobileNumber.value });
    if (!result?.data?.forgotPassword?.success) {
      error.value = result?.data?.forgotPassword?.errors?.[0]?.message ?? 'Could not send code.';
      return;
    }
    await navigateTo(`/reset-password?mobileNumber=${encodeURIComponent(mobileNumber.value)}`);
  } finally {
    loading.value = false;
  }
}
</script>
