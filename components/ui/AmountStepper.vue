<template>
  <div>
    <span class="text-xs font-medium text-ink/60">Amount</span>
    <div class="mt-1.5 flex items-center gap-3">
      <button
        type="button"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-ink/15 text-lg text-ink/70 disabled:opacity-30"
        :disabled="modelValue - step < min"
        @click="$emit('update:modelValue', Math.max(min, modelValue - step))"
      >
        −
      </button>

      <div class="flex h-12 flex-1 items-center justify-center rounded-lg border border-ink/15 bg-paper px-3">
        <span class="mr-1 font-mono text-sm text-ink/40">GHS</span>
        <span class="font-mono text-xl tabular">{{ modelValue.toLocaleString() }}</span>
      </div>

      <button
        type="button"
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-ink/15 text-lg text-ink/70 disabled:opacity-30"
        :disabled="modelValue + step > max"
        @click="$emit('update:modelValue', Math.min(max, modelValue + step))"
      >
        +
      </button>
    </div>

    <div class="mt-2.5 flex justify-between font-mono text-[11px] text-ink/40">
      <span>Min GHS {{ min.toLocaleString() }}</span>
      <span>Steps of {{ step }}</span>
      <span>Max GHS {{ max.toLocaleString() }}</span>
    </div>

    <input
      type="range"
      class="mt-3 w-full accent-forest"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<script setup lang="ts">
// Enforces the PRD's "multiples of 100, within category min/max" rule at
// the UI layer (Phase 1 investment rules) — both stepper buttons and the
// slider only ever land on a valid multiple, so the amount reaching
// createInvestment's Zod-equivalent server check (investments/service.ts)
// is already guaranteed valid in the common case; the server check remains
// authoritative regardless (Phase 4 §7).
defineProps<{ modelValue: number; min: number; max: number; step: number }>();
defineEmits(['update:modelValue']);
</script>
