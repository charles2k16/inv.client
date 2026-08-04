<template>
  <div>
    <section class="flex items-center justify-between">
      <div>
        <p class="text-sm text-ink/50">Welcome back,</p>
        <h1 class="font-display text-xl">{{ authStore.user?.firstName ?? '...' }}</h1>
      </div>
      <NuxtLink v-if="authStore.user?.kycStatus !== 'APPROVED'" to="/profile/kyc" class="rounded-full bg-gold/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-gold-dark">
        Verify KYC
      </NuxtLink>
    </section>

    <div v-if="loading" class="mt-6 space-y-4">
      <SkeletonBlock class-name="h-40 w-full rounded-2xl" />
      <SkeletonBlock class-name="h-20 w-full rounded-2xl" />
      <SkeletonBlock class-name="h-32 w-full rounded-2xl" />
    </div>

    <template v-else>
      <div class="mt-6">
        <PortfolioCard
          :portfolio-value="portfolioValue"
          :total-invested="totalInvested"
          :total-earnings="totalEarnings"
        />
      </div>

      <div class="mt-5">
        <WalletSummaryRow :wallets="walletSummaries" />
      </div>

      <div class="mt-5">
        <EarningsTabs :daily="earnings.daily" :weekly="earnings.weekly" :monthly="earnings.monthly" />
      </div>

      <section class="mt-7">
        <div class="flex items-center justify-between">
          <p class="eyebrow font-medium">Recent transactions</p>
          <NuxtLink to="/wallet" class="text-xs text-forest">See all</NuxtLink>
        </div>
        <div class="mt-2 divide-y divide-ink/8">
          <TransactionRow v-for="tx in recentTransactions" :key="tx.id" v-bind="tx" />
          <p v-if="recentTransactions.length === 0" class="py-6 text-center text-sm text-ink/40">No transactions yet.</p>
        </div>
      </section>

      <section class="mt-7">
        <div class="flex items-center justify-between">
          <p class="eyebrow font-medium">Active investments</p>
          <NuxtLink to="/investments" class="text-xs text-forest">See all</NuxtLink>
        </div>
        <div class="mt-2 space-y-2.5">
          <InvestmentListItem
            v-for="inv in activeInvestments"
            :key="inv.id"
            :id="inv.id"
            :plan-name="inv.plan.name"
            :category-name="inv.plan.category.name"
            :amount="inv.amount"
            :status="inv.status"
            :distribution-frequency="inv.distributionFrequency"
          />
          <div v-if="activeInvestments.length === 0" class="rounded-2xl border border-dashed border-ink/15 p-6 text-center">
            <p class="text-sm text-ink/50">No active investments yet.</p>
            <NuxtLink to="/invest" class="mt-2 inline-block text-sm font-medium text-forest">Start investing →</NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { MY_WALLETS, MY_WALLET_TRANSACTIONS } from '~/graphql/wallets';
import { MY_INVESTMENTS } from '~/graphql/investments';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Ferrow' });

const authStore = useAuthStore();

const { result: walletsResult, loading: walletsLoading } = useQuery(MY_WALLETS);
const { result: investmentsResult, loading: investmentsLoading } = useQuery(MY_INVESTMENTS);
const { result: txResult } = useQuery(MY_WALLET_TRANSACTIONS, { walletType: null });

const loading = computed(() => walletsLoading.value || investmentsLoading.value);

const wallets = computed(() => walletsResult.value?.myWallets);
const investments = computed<any[]>(() => investmentsResult.value?.myInvestments ?? []);
const recentTransactions = computed<any[]>(() => (txResult.value?.myWalletTransactions ?? []).slice(0, 4));

const totalInvested = computed(() =>
  investments.value.filter((i) => i.status === 'ACTIVE').reduce((sum, i) => sum + Number(i.amount), 0),
);
const totalEarnings = computed(() =>
  investments.value.reduce((sum, i) => sum + Number(i.actualEarningsToDate), 0),
);
const portfolioValue = computed(() => totalInvested.value + totalEarnings.value);

const walletSummaries = computed(() => [
  { label: 'Investment', balance: Number(wallets.value?.investment.balance ?? 0), accent: '#2F5233' },
  { label: 'Referral', balance: Number(wallets.value?.referral.balance ?? 0), accent: '#B8863A' },
  { label: 'Withdrawable', balance: Number(wallets.value?.withdrawable.balance ?? 0), accent: '#3E6B8A' },
]);

// NOTE: daily/weekly/monthly here are derived client-side from currently
// active investments' plan rates as a *display estimate* — the
// authoritative per-period amount is whatever the (not-yet-built) BullMQ
// distribution scheduler actually pays out and logs (Phase 2 ADR-008).
// Swap this for a real `myDashboard.earnings` aggregate query (Phase 4 §5)
// once that resolver exists, rather than trusting this client estimate
// long-term.
const earnings = computed(() => {
  const active = investments.value.filter((i) => i.status === 'ACTIVE');
  const monthly = active.reduce((sum, i) => sum + (Number(i.amount) * Number(i.plan?.monthlyReturnPercent ?? 0)) / 100, 0);
  return { daily: monthly / 30, weekly: monthly / 4, monthly };
});

const activeInvestments = computed(() => investments.value.filter((i) => i.status === 'ACTIVE').slice(0, 3));
</script>
