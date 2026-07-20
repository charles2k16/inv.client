<template>
  <div class="rounded-2xl bg-forest bg-ledger p-6 text-paper">
    <p class="eyebrow text-paper/60">Portfolio value</p>
    <p class="mt-2 font-mono text-3xl tabular">GHS {{ formatMoney(portfolioValue) }}</p>

    <div class="mt-5 grid grid-cols-2 gap-4 border-t border-paper/15 pt-4 text-sm">
      <div>
        <p class="text-paper/50">Invested</p>
        <p class="mt-0.5 font-mono tabular">GHS {{ formatMoney(totalInvested) }}</p>
      </div>
      <div>
        <p class="text-paper/50">Earned to date</p>
        <p class="mt-0.5 font-mono tabular text-gold-light">+GHS {{ formatMoney(totalEarnings) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatMoney } from '~/utils/money';

defineProps<{ portfolioValue: number; totalInvested: number; totalEarnings: number }>();
</script>
