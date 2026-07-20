<template>
  <NuxtLink :to="`/invest/plan/${id}`" class="block rounded-2xl border border-ink/10 p-5">
    <div class="flex items-start justify-between">
      <h3 class="font-display text-lg">{{ name }}</h3>
      <span class="rounded-full border border-ink/15 px-2 py-0.5 font-mono text-[10px] uppercase text-ink/55">{{ riskLevel.toLowerCase() }}</span>
    </div>
    <p class="mt-1.5 text-xs leading-relaxed text-ink/55">{{ description }}</p>

    <div class="mt-4 grid grid-cols-3 gap-2 border-t border-ink/10 pt-3.5 text-center">
      <div>
        <p class="font-mono text-sm tabular text-forest">{{ monthlyReturnPercent }}%</p>
        <p class="mt-0.5 text-[10px] text-ink/40">target / mo</p>
      </div>
      <div>
        <p class="font-mono text-sm tabular">{{ durationDays }}d</p>
        <p class="mt-0.5 text-[10px] text-ink/40">term</p>
      </div>
      <div>
        <p class="font-mono text-sm tabular">{{ minAmount }}–{{ maxAmount }}</p>
        <p class="mt-0.5 text-[10px] text-ink/40">GHS range</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  description: string;
  monthlyReturnPercent: string | number;
  durationDays: number;
  minAmount: string | number;
  maxAmount: string | number;
  riskLevel: string;
}>();
</script>
