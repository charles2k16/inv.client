<template>
  <div>
    <div v-if="loading"><SkeletonBlock class-name="h-64 w-full rounded-2xl" /></div>

    <template v-else-if="investment">
      <div class="flex items-start justify-between">
        <div>
          <p class="eyebrow">{{ investment.plan.category.name }}</p>
          <h1 class="mt-1 font-display text-2xl">{{ investment.plan.name }}</h1>
        </div>
        <StatusBadge :status="investment.status" />
      </div>

      <div class="mt-6 rounded-2xl bg-forest bg-ledger p-6 text-paper">
        <p class="eyebrow text-paper/60">Principal invested</p>
        <p class="mt-1.5 font-mono text-2xl tabular">GHS {{ formatMoney(investment.amount) }}</p>
        <div class="mt-4 grid grid-cols-2 gap-4 border-t border-paper/15 pt-4 text-sm">
          <div>
            <p class="text-paper/50">Earned so far</p>
            <p class="mt-0.5 font-mono tabular text-gold-light">+GHS {{ formatMoney(investment.actualEarningsToDate) }}</p>
          </div>
          <div>
            <p class="text-paper/50">Projected total</p>
            <p class="mt-0.5 font-mono tabular">GHS {{ formatMoney(investment.projectedEarnings) }}</p>
          </div>
        </div>
      </div>

      <dl class="mt-5 grid grid-cols-2 gap-4 rounded-2xl border border-ink/10 p-5 text-sm">
        <div>
          <dt class="text-ink/50">Target rate</dt>
          <dd class="mt-0.5 font-mono tabular">{{ investment.projectedMonthlyReturnPercent }}% / mo</dd>
        </div>
        <div>
          <dt class="text-ink/50">Payout frequency</dt>
          <dd class="mt-0.5">{{ investment.distributionFrequency.toLowerCase() }}</dd>
        </div>
        <div>
          <dt class="text-ink/50">Started</dt>
          <dd class="mt-0.5">{{ investment.startDate ? formatDate(investment.startDate) : '—' }}</dd>
        </div>
        <div>
          <dt class="text-ink/50">Ends</dt>
          <dd class="mt-0.5">{{ investment.endDate ? formatDate(investment.endDate) : '—' }}</dd>
        </div>
        <div>
          <dt class="text-ink/50">Risk level</dt>
          <dd class="mt-0.5">{{ investment.riskLevel.toLowerCase() }}</dd>
        </div>
        <div>
          <dt class="text-ink/50">Created</dt>
          <dd class="mt-0.5">{{ formatDate(investment.createdAt) }}</dd>
        </div>
      </dl>

      <p v-if="investment.status === 'PENDING_PAYMENT'" class="mt-5 rounded-xl bg-gold/10 p-4 text-xs leading-relaxed text-gold-dark">
        This investment is awaiting your payment confirmation. Complete payment via the provider you selected, then
        our team will review and activate it.
      </p>
      <p v-else-if="investment.status === 'PENDING_APPROVAL'" class="mt-5 rounded-xl bg-gold/10 p-4 text-xs leading-relaxed text-gold-dark">
        Payment received — this investment is being reviewed by our team and will activate shortly.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { INVESTMENT_DETAIL } from '~/graphql/investments';
import { formatMoney, formatDate } from '~/utils/money';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Investment', showBack: true });

const route = useRoute();
const { result, loading } = useQuery(INVESTMENT_DETAIL, { id: route.params.id as string });
const investment = computed(() => result.value?.investment);
</script>
