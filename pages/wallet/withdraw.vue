<template>
  <div>
    <p class="eyebrow">{{ walletLabel }} wallet</p>
    <h1 class="mt-1 font-display text-2xl">Request withdrawal</h1>
    <p class="mt-1.5 text-sm text-ink/55">Reviewed by our team, then paid to Mobile Money — usually within 1–2 business days.</p>

    <form class="mt-7 space-y-4" @submit.prevent="submit">
      <AppInput v-model="amount" label="Amount (GHS)" inputmode="numeric" placeholder="100" :error="fieldError('amount')" hint="Minimum GHS 100." />
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="net in networks"
          :key="net"
          type="button"
          class="rounded-lg border py-2.5 text-xs font-medium"
          :class="network === net ? 'border-forest bg-forest/10 text-forest' : 'border-ink/15 text-ink/60'"
          @click="network = net"
        >
          {{ net }}
        </button>
      </div>
      <AppInput v-model="momoNumber" label="Mobile Money number" type="tel" inputmode="tel" placeholder="024 123 4567" :error="fieldError('momoNumber')" />
      <AppInput v-model="accountName" label="Account name" :error="fieldError('accountName')" />

      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="submitting">Submit request</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { REQUEST_WITHDRAWAL } from '~/graphql/wallets';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Withdraw', showBack: true });

const route = useRoute();
const walletType = (route.query.wallet as string) ?? 'WITHDRAWABLE';
const walletLabel = walletType.charAt(0) + walletType.slice(1).toLowerCase();

const amount = ref('');
const network = ref('MTN');
const momoNumber = ref('');
const accountName = ref('');
const networks = ['MTN', 'VODAFONE', 'AIRTELTIGO'];
const errors = ref<{ field?: string; message: string }[]>([]);
const formError = ref('');
const submitting = ref(false);

function fieldError(field: string) {
  return errors.value.find((e) => e.field === field)?.message;
}

const { mutate: requestWithdrawal } = useMutation(REQUEST_WITHDRAWAL);

async function submit() {
  errors.value = [];
  formError.value = '';
  submitting.value = true;
  try {
    const res = await requestWithdrawal({
      input: {
        walletType,
        amount: amount.value,
        momoNumber: momoNumber.value,
        network: network.value,
        accountName: accountName.value,
      },
    });
    const payload = res?.data?.requestWithdrawal;
    if (!payload?.success) {
      errors.value = payload?.errors ?? [];
      formError.value = errors.value.find((e) => !e.field)?.message ?? 'Could not submit this request.';
      return;
    }
    await navigateTo('/wallet');
  } finally {
    submitting.value = false;
  }
}
</script>
