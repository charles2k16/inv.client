<!--
OTP verification disabled after signup.

<template>
  <div>
    <h1 class="font-display text-2xl">Verify your number</h1>
    <p class="mt-1.5 text-sm text-ink/55">Enter the 6-digit code sent to {{ mobileNumber }}.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput v-model="code" label="Verification code" inputmode="numeric" :maxlength="6" placeholder="123456" :error="error" />

      <AppButton type="submit" :loading="loading">Verify</AppButton>
    </form>

    <button type="button" class="mt-5 w-full text-center text-sm text-forest disabled:text-ink/30" :disabled="resendCooldown > 0" @click="resend">
      {{ resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { VERIFY_OTP, REQUEST_OTP } from '~/graphql/auth';

definePageMeta({ layout: 'auth' });

const route = useRoute();
const mobileNumber = (route.query.mobileNumber as string) ?? '';
const code = ref('');
const error = ref('');
const loading = ref(false);
const resendCooldown = ref(60);

const { mutate: verifyOtp } = useMutation(VERIFY_OTP);
const { mutate: requestOtp } = useMutation(REQUEST_OTP);

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
  timer = setInterval(() => {
    if (resendCooldown.value > 0) resendCooldown.value--;
  }, 1000);
});
onUnmounted(() => clearInterval(timer));

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    const result = await verifyOtp({ mobileNumber, code: code.value, purpose: 'MOBILE_VERIFICATION' });
    if (!result?.data?.verifyOtp?.success) {
      error.value = result?.data?.verifyOtp?.errors?.[0]?.message ?? 'Invalid code.';
      return;
    }
    await navigateTo('/login');
  } finally {
    loading.value = false;
  }
}

async function resend() {
  if (resendCooldown.value > 0) return;
  await requestOtp({ mobileNumber, purpose: 'MOBILE_VERIFICATION' });
  resendCooldown.value = 60;
}
</script>
-->

<script setup lang="ts">
definePageMeta({ layout: 'auth' });
await navigateTo('/login');
</script>
