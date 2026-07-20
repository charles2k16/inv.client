<template>
  <span class="flex items-center gap-1.5" :class="textClass">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20c6-1 9-4 9-10 0-3 2-6 7-8-1 6-3 9-7 10-3 1-6 4-9 8Z" fill="#2F5233" />
      <path d="M4 20c2-4 4-6 7-7" stroke="#B8863A" stroke-width="1.4" stroke-linecap="round" />
    </svg>
    <span v-if="withWordmark" class="font-display text-lg leading-none">Ferrow</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number; withWordmark?: boolean; dark?: boolean }>(), {
  size: 22,
  withWordmark: true,
  dark: false,
});
const textClass = '';
</script>
