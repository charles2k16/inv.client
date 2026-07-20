<template>
  <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide" :class="toneClasses">
    <span class="h-1.5 w-1.5 rounded-full" :class="dotClasses" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ status: string }>();

const toneMap: Record<string, { badge: string; dot: string; label: string }> = {
  ACTIVE: { badge: 'bg-forest/10 text-forest', dot: 'bg-forest', label: 'Active' },
  PENDING_APPROVAL: { badge: 'bg-gold/15 text-gold-dark', dot: 'bg-gold', label: 'Pending approval' },
  PENDING_PAYMENT: { badge: 'bg-gold/15 text-gold-dark', dot: 'bg-gold', label: 'Awaiting payment' },
  PENDING: { badge: 'bg-gold/15 text-gold-dark', dot: 'bg-gold', label: 'Pending' },
  APPROVED: { badge: 'bg-sky/10 text-sky', dot: 'bg-sky', label: 'Approved' },
  COMPLETED: { badge: 'bg-forest/10 text-forest', dot: 'bg-forest', label: 'Completed' },
  PAID: { badge: 'bg-forest/10 text-forest', dot: 'bg-forest', label: 'Paid' },
  REJECTED: { badge: 'bg-red-500/10 text-red-600', dot: 'bg-red-500', label: 'Rejected' },
  CANCELLED: { badge: 'bg-ink/10 text-ink/50', dot: 'bg-ink/40', label: 'Cancelled' },
};

const tone = computed(() => toneMap[props.status] ?? { badge: 'bg-ink/10 text-ink/60', dot: 'bg-ink/40', label: props.status });
const toneClasses = computed(() => tone.value.badge);
const dotClasses = computed(() => tone.value.dot);
const label = computed(() => tone.value.label);
</script>
