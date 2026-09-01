<template>
  <div>
    <h1 class="font-display text-2xl font-bold">Create your PIN</h1>
    <p class="mt-1.5 text-sm font-medium text-ink/55">
      Choose a 6-digit PIN. You will use this instead of SMS codes every time you log in.
    </p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput
        v-model="pin"
        label="6-digit PIN"
        type="password"
        inputmode="numeric"
        :maxlength="6"
        placeholder="••••••"
        :error="fieldError('pin')"
      />
      <AppInput
        v-model="confirmPin"
        label="Confirm PIN"
        type="password"
        inputmode="numeric"
        :maxlength="6"
        placeholder="••••••"
        :error="fieldError('confirmPin')"
      />

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="loading">Save PIN</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { SET_PIN } from '~/graphql/auth';

definePageMeta({ layout: 'auth', middleware: 'auth' });

const pin = ref('');
const confirmPin = ref('');
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const { mutate: setPin } = useMutation(SET_PIN);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

async function submit() {
  errors.value = [];
  formError.value = '';
  loading.value = true;
  try {
    const result = await setPin({ input: { pin: pin.value, confirmPin: confirmPin.value } });
    const payload = result?.data?.setPin;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not save your PIN.';
      return;
    }
    authStore.markPinSet();
    if (payload.user) {
      authStore.user = {
        id: payload.user.id,
        firstName: payload.user.firstName,
        lastName: payload.user.lastName,
        mobileNumber: payload.user.mobileNumber,
        kycStatus: payload.user.kycStatus,
        referralCode: payload.user.referralCode,
        hasPin: true,
      };
    }
    await navigateTo('/dashboard');
  } catch {
    formError.value = 'Something went wrong. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
