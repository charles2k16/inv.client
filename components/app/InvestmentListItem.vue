<template>
  <NuxtLink :to="`/investments/${id}`" class="flex items-center justify-between rounded-xl border border-ink/10 p-4">
    <div>
      <p class="font-display text-base">{{ planName }}</p>
      <p class="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/40">{{ categoryName }} · {{ distributionFrequency.toLowerCase() }}</p>
      <p class="mt-1.5 font-mono text-sm tabular text-ink/70">GHS {{ formatMoney(amount) }}</p>
    </div>
    <StatusBadge :status="status" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatMoney } from '~/utils/money';

defineProps<{
  id: string;
  planName: string;
  categoryName: string;
  amount: string | number;
  status: string;
  distributionFrequency: string;
}>();
</script>
