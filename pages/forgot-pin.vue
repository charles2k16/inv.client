<template>
  <div>
    <h1 class="font-display text-2xl font-bold">Reset your PIN</h1>
    <p class="mt-1.5 text-sm font-medium text-ink/55">
      Confirm your password, then choose a new 6-digit PIN. No SMS required.
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
      <AppInput v-model="password" label="Password" type="password" :error="fieldError('password')" />
      <AppInput
        v-model="pin"
        label="New 6-digit PIN"
        type="password"
        inputmode="numeric"
        :maxlength="6"
        placeholder="••••••"
        :error="fieldError('pin')"
      />
      <AppInput
        v-model="confirmPin"
        label="Confirm new PIN"
        type="password"
        inputmode="numeric"
        :maxlength="6"
        placeholder="••••••"
        :error="fieldError('confirmPin')"
      />

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="loading">Save new PIN</AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-ink/55">
      <NuxtLink to="/login" class="font-medium text-forest hover:underline">Back to log in</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { RESET_PIN_WITH_PASSWORD } from '~/graphql/auth';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const mobileNumber = ref('');
const password = ref('');
const pin = ref('');
const confirmPin = ref('');
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const loading = ref(false);

const { mutate: resetPin } = useMutation(RESET_PIN_WITH_PASSWORD);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

async function submit() {
  errors.value = [];
  formError.value = '';
  loading.value = true;
  try {
    const result = await resetPin({
      input: {
        mobileNumber: mobileNumber.value,
        password: password.value,
        pin: pin.value,
        confirmPin: confirmPin.value,
      },
    });
    const payload = result?.data?.resetPinWithPassword;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not reset your PIN.';
      return;
    }
    await navigateTo('/login');
  } catch {
    formError.value = 'Something went wrong. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
