<template>
  <div class="rounded-2xl border border-ink/10 p-5">
    <p class="eyebrow">Earnings summary</p>

    <div class="mt-3 flex gap-1.5">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="flex-1 rounded-lg py-2 text-xs font-medium transition-colors"
        :class="active === tab.key ? 'bg-forest text-paper' : 'bg-ink/5 text-ink/60'"
        @click="active = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <p class="mt-4 font-mono text-2xl tabular text-forest">+GHS {{ formatMoney(current) }}</p>
    <p class="mt-1 text-xs text-ink/45">{{ activeTabLabel }} earnings, across all active investments</p>
  </div>
</template>

<script setup lang="ts">
import { formatMoney } from '~/utils/money';

const props = defineProps<{ daily: number; weekly: number; monthly: number }>();

const tabs = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
] as const;

const active = ref<'daily' | 'weekly' | 'monthly'>('daily');
const current = computed(() => props[active.value]);
const activeTabLabel = computed(() => tabs.find((t) => t.key === active.value)!.label);
</script>
