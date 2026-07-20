<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex w-full items-center justify-center gap-2 rounded-lg font-sans text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[sizeClasses, variantClasses]"
  >
    <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'lg';

const props = withDefaults(
  defineProps<{ variant?: Variant; size?: Size; loading?: boolean; disabled?: boolean; type?: 'button' | 'submit' }>(),
  { variant: 'primary', size: 'lg', loading: false, disabled: false, type: 'button' },
);

const sizeClasses = props.size === 'lg' ? 'h-12 px-5 text-[15px]' : 'h-10 px-4';

const variantClasses = {
  primary: 'bg-forest text-paper hover:bg-forest-dark active:bg-forest-dark',
  secondary: 'bg-gold/15 text-gold-dark hover:bg-gold/25',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  danger: 'bg-red-600/10 text-red-700 hover:bg-red-600/15',
}[props.variant];
</script>
