<template>
  <NuxtLink to="/wallet" class="grid grid-cols-3 gap-3">
    <div v-for="w in wallets" :key="w.label" class="rounded-xl border border-ink/10 p-3.5">
      <p class="font-mono text-[10px] uppercase tracking-wide" :style="{ color: w.accent }">{{ w.label }}</p>
      <p class="mt-1.5 font-mono text-sm tabular">GHS {{ formatMoney(w.balance) }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatMoney } from '~/utils/money';

defineProps<{
  wallets: { label: string; balance: number; accent: string }[];
}>();
</script>
