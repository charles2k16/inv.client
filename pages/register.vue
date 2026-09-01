<template>
  <div>
    <h1 class="font-display text-2xl font-bold">Create your account</h1>
    <p class="mt-1.5 text-sm text-ink/55 font-medium">Takes about five minutes. No card required.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-3">
        <AppInput v-model="firstName" label="First name" :error="fieldError('firstName')" />
        <AppInput v-model="lastName" label="Last name" :error="fieldError('lastName')" />
      </div>
      <AppInput
        v-model="mobileNumber"
        label="Mobile number"
        type="tel"
        inputmode="tel"
        placeholder="+233 24 123 4567"
        :error="fieldError('mobileNumber')"
      />
      <AppInput v-model="dateOfBirth" label="Date of birth" type="date" :error="fieldError('dateOfBirth')" />
      <AppInput v-model="password" label="Password" type="password" hint="At least 8 characters." :error="fieldError('password')" />
      <AppInput v-model="referralCode" label="Referral code (optional)" :error="fieldError('referralCode')" />

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="loading">Create account</AppButton>
    </form>

    <p class="mt-6 text-center text-sm text-ink/55">
      Already have an account?
      <NuxtLink to="/login" class="font-medium text-forest hover:underline font-bold">Log in</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { REGISTER } from '~/graphql/auth';

definePageMeta({ layout: 'auth', middleware: 'guest' });

const route = useRoute();
const firstName = ref('');
const lastName = ref('');
const mobileNumber = ref('');
const dateOfBirth = ref('');
const password = ref('');
const referralCode = ref((route.query.ref as string) ?? '');
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const loading = ref(false);

const { mutate: register } = useMutation(REGISTER);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

async function submit() {
  errors.value = [];
  formError.value = '';
  loading.value = true;
  try {
    const result = await register({
      input: {
        firstName: firstName.value,
        lastName: lastName.value,
        mobileNumber: mobileNumber.value,
        dateOfBirth: dateOfBirth.value,
        password: password.value,
        referralCode: referralCode.value || undefined,
      },
    });
    const payload = result?.data?.register;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not create your account.';
      return;
    }
    // After signup: log in with password once to create a 6-digit PIN (no SMS).
    await navigateTo('/login?setup=1');
  } catch (err) {
    formError.value = 'Something went wrong. Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}
</script>
