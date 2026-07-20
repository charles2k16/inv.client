<template>
  <div class="animate-pulse rounded-lg bg-ink/8" :class="className" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ className?: string }>(), { className: 'h-4 w-full' });
</script>
