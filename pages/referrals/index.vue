<template>
  <div>
    <p class="eyebrow">Referrals</p>
    <h1 class="mt-1 font-display text-2xl">Share &amp; earn</h1>

    <div v-if="loading" class="mt-6 space-y-3">
      <SkeletonBlock class-name="h-32 w-full rounded-2xl" />
    </div>

    <template v-else-if="dashboard">
      <div class="mt-6 rounded-2xl bg-forest bg-ledger p-6 text-paper">
        <p class="eyebrow text-paper/60">Your referral code</p>
        <p class="mt-1.5 font-mono text-2xl tracking-widest">{{ dashboard.referralCode }}</p>
        <div class="mt-4 flex gap-2">
          <button type="button" class="flex-1 rounded-lg bg-paper/15 py-2.5 text-xs font-medium" @click="copyLink">
            {{ copied ? 'Copied!' : 'Copy link' }}
          </button>
          <button type="button" class="flex-1 rounded-lg bg-gold py-2.5 text-xs font-medium text-ink" @click="share">
            Share
          </button>
        </div>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-3">
        <div class="rounded-xl border border-ink/10 p-3.5 text-center">
          <p class="font-mono text-lg tabular">{{ dashboard.totalReferrals }}</p>
          <p class="mt-0.5 text-[10px] text-ink/45">Total</p>
        </div>
        <div class="rounded-xl border border-ink/10 p-3.5 text-center">
          <p class="font-mono text-lg tabular text-forest">{{ dashboard.successfulReferrals }}</p>
          <p class="mt-0.5 text-[10px] text-ink/45">Successful</p>
        </div>
        <div class="rounded-xl border border-ink/10 p-3.5 text-center">
          <p class="font-mono text-lg tabular text-gold-dark">{{ dashboard.pendingReferrals }}</p>
          <p class="mt-0.5 text-[10px] text-ink/45">Pending</p>
        </div>
      </div>

      <div class="mt-5 rounded-2xl border border-ink/10 p-5">
        <div class="flex items-center justify-between">
          <p class="eyebrow">Referral earnings</p>
          <NuxtLink to="/wallet/withdraw?wallet=REFERRAL" class="text-xs text-forest">Withdraw</NuxtLink>
        </div>
        <p class="mt-1.5 font-mono text-xl tabular text-forest">GHS {{ formatMoney(dashboard.availableReferralEarnings) }}</p>
        <p class="mt-1 text-[11px] text-ink/40">GHS {{ formatMoney(dashboard.totalReferralEarnings) }} earned in total</p>
      </div>

      <section class="mt-7">
        <p class="eyebrow">Your referrals</p>
        <div class="mt-2 space-y-2.5">
          <div v-for="ref in referrals" :key="ref.id" class="flex items-center justify-between rounded-xl border border-ink/10 p-4">
            <div>
              <p class="text-sm">{{ ref.referredUser.firstName }} {{ ref.referredUser.lastInitial }}.</p>
              <p class="mt-0.5 font-mono text-[11px] text-ink/40">Joined {{ formatDate(ref.referredUser.joinedAt) }}</p>
            </div>
            <div class="text-right">
              <StatusBadge :status="ref.status === 'SUCCESSFUL' ? 'COMPLETED' : 'PENDING'" />
              <p v-if="ref.bonus" class="mt-1 font-mono text-xs tabular text-forest">+GHS {{ formatMoney(ref.bonus.amount) }}</p>
            </div>
          </div>
          <p v-if="referrals.length === 0" class="rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/50">
            No referrals yet — share your link above to get started.
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { MY_REFERRAL_DASHBOARD, MY_REFERRALS } from '~/graphql/referrals';
import { formatMoney, formatDate } from '~/utils/money';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Referrals' });

const { result, loading } = useQuery(MY_REFERRAL_DASHBOARD);
const dashboard = computed(() => result.value?.myReferralDashboard);

const { result: referralsResult } = useQuery(MY_REFERRALS);
const referrals = computed(() => referralsResult.value?.myReferrals ?? []);

const copied = ref(false);
async function copyLink() {
  if (!dashboard.value) return;
  await navigator.clipboard.writeText(dashboard.value.referralLink);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1800);
}

async function share() {
  if (!dashboard.value) return;
  const shareData = { title: 'Invest with me on Ferrow', url: dashboard.value.referralLink };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // user cancelled the native share sheet — no error state needed
    }
  } else {
    await copyLink();
  }
}
</script>
