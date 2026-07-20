<template>
  <div>
    <h1 class="font-display text-2xl">Reset password</h1>
    <p class="mt-1.5 text-sm text-ink/55">Enter the code sent to {{ mobileNumber }} and a new password.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput v-model="otpCode" label="Verification code" inputmode="numeric" :maxlength="6" placeholder="123456" />
      <AppInput v-model="newPassword" label="New password" type="password" hint="At least 8 characters." />
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <AppButton type="submit" :loading="loading">Reset password</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { RESET_PASSWORD } from '~/graphql/auth';

definePageMeta({ layout: 'auth' });

const route = useRoute();
const mobileNumber = (route.query.mobileNumber as string) ?? '';
const otpCode = ref('');
const newPassword = ref('');
const error = ref('');
const loading = ref(false);
const { mutate: resetPassword } = useMutation(RESET_PASSWORD);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    const result = await resetPassword({ input: { mobileNumber, otpCode: otpCode.value, newPassword: newPassword.value } });
    if (!result?.data?.resetPassword?.success) {
      error.value = result?.data?.resetPassword?.errors?.[0]?.message ?? 'Could not reset password.';
      return;
    }
    await navigateTo('/login');
  } finally {
    loading.value = false;
  }
}
</script>
