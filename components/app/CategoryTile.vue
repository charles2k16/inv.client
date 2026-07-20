<template>
  <NuxtLink :to="`/invest/${type.toLowerCase()}`" class="flex items-center justify-between rounded-2xl border border-ink/10 p-5">
    <div>
      <p class="font-mono text-[11px] uppercase tracking-wide" :style="{ color: accent }">{{ label }}</p>
      <h3 class="mt-1.5 font-display text-xl">{{ title }}</h3>
      <p class="mt-1 text-xs text-ink/50">From GHS {{ minAmount }} · {{ risk }} risk</p>
    </div>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="shrink-0 text-ink/30">
      <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ type: string; label: string; title: string; minAmount: string; risk: string; accent: string }>();
</script>
