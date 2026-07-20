<template>
  <div>
    <p class="eyebrow">Your wallets</p>
    <h1 class="mt-1 font-display text-2xl">Wallet</h1>

    <div v-if="loading" class="mt-6 space-y-3">
      <SkeletonBlock class-name="h-24 w-full rounded-2xl" />
    </div>

    <template v-else>
      <div class="mt-6 flex gap-1.5 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium"
          :class="activeWallet === tab.value ? 'bg-forest text-paper' : 'bg-ink/6 text-ink/55'"
          @click="activeWallet = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-4 rounded-2xl border border-ink/10 p-5">
        <p class="eyebrow">{{ tabs.find((t) => t.value === activeWallet)?.label }} balance</p>
        <p class="mt-1.5 font-mono text-2xl tabular text-forest">GHS {{ formatMoney(currentBalance) }}</p>
        <p v-if="currentLocked > 0" class="mt-1 font-mono text-[11px] text-ink/40">GHS {{ formatMoney(currentLocked) }} locked in pending withdrawal</p>

        <NuxtLink
          v-if="activeWallet !== 'investment'"
          :to="`/wallet/withdraw?wallet=${activeWallet.toUpperCase()}`"
          class="mt-4 inline-block rounded-lg bg-forest px-4 py-2 text-sm font-medium text-paper"
        >
          Withdraw
        </NuxtLink>
      </div>

      <section class="mt-7">
        <p class="eyebrow">Transaction history</p>
        <div class="mt-2 divide-y divide-ink/8">
          <TransactionRow v-for="tx in transactions" :key="tx.id" v-bind="tx" />
          <p v-if="transactions.length === 0" class="py-6 text-center text-sm text-ink/40">No transactions yet.</p>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { MY_WALLETS, MY_WALLET_TRANSACTIONS } from '~/graphql/wallets';
import { formatMoney } from '~/utils/money';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Wallet' });

const tabs = [
  { value: 'investment', label: 'Investment' },
  { value: 'referral', label: 'Referral' },
  { value: 'withdrawable', label: 'Withdrawable' },
];
const activeWallet = ref<'investment' | 'referral' | 'withdrawable'>('withdrawable');

const { result, loading } = useQuery(MY_WALLETS);
const wallets = computed(() => result.value?.myWallets);
const currentBalance = computed(() => Number(wallets.value?.[activeWallet.value]?.balance ?? 0));
const currentLocked = computed(() => Number(wallets.value?.[activeWallet.value]?.lockedBalance ?? 0));

const walletTypeMap = { investment: 'INVESTMENT', referral: 'REFERRAL', withdrawable: 'WITHDRAWABLE' } as const;
const { result: txResult } = useQuery(MY_WALLET_TRANSACTIONS, () => ({ walletType: walletTypeMap[activeWallet.value] }));
const transactions = computed(() => txResult.value?.myWalletTransactions ?? []);
</script>
