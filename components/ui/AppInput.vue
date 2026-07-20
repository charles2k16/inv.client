<template>
  <label class="block">
    <span class="text-xs font-medium text-ink/60">{{ label }}</span>
    <div class="relative mt-1.5">
      <span v-if="prefix" class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-ink/40">{{ prefix }}</span>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :inputmode="inputmode"
        :maxlength="maxlength"
        class="h-12 w-full rounded-lg border bg-paper text-[15px] outline-none transition-colors focus:border-forest"
        :class="[prefix ? 'pl-9' : 'pl-3.5', 'pr-3.5', error ? 'border-red-400' : 'border-ink/15']"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="mt-1.5 text-xs text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1.5 text-xs text-ink/45">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    type?: string;
    placeholder?: string;
    inputmode?: 'text' | 'numeric' | 'tel' | 'email' | 'decimal';
    maxlength?: number;
    error?: string;
    hint?: string;
    prefix?: string;
  }>(),
  { type: 'text' },
);
defineEmits(['update:modelValue']);
</script>
