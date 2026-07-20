<template>
  <div class="flex items-center justify-between py-3">
    <div class="flex items-center gap-3">
      <div class="flex h-9 w-9 items-center justify-center rounded-full" :class="iconBg">
        <span class="font-mono text-sm" :class="iconText">{{ isCredit ? '+' : '−' }}</span>
      </div>
      <div>
        <p class="text-sm">{{ description }}</p>
        <p class="mt-0.5 font-mono text-[11px] text-ink/40">{{ formatDateTime(createdAt) }}</p>
      </div>
    </div>
    <p class="font-mono text-sm tabular" :class="isCredit ? 'text-forest' : 'text-ink/70'">
      {{ isCredit ? '+' : '' }}GHS {{ formatMoney(Math.abs(Number(amount))) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { formatMoney, formatDateTime } from '~/utils/money';

const props = defineProps<{ amount: string | number; description?: string; type: string; createdAt: string }>();
const isCredit = computed(() => Number(props.amount) >= 0);
const iconBg = computed(() => (isCredit.value ? 'bg-forest/10' : 'bg-ink/8'));
const iconText = computed(() => (isCredit.value ? 'text-forest' : 'text-ink/50'));
const description = computed(() => props.description || props.type.replaceAll('_', ' ').toLowerCase());
</script>
