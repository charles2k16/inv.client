<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b border-ink/10 bg-paper/95 px-5 py-3.5 backdrop-blur">
    <button v-if="showBack" type="button" class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5" aria-label="Back" @click="$router.back()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5 8 12l7 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
    <FerrowLogo v-else :size="20" />

    <h1 class="font-display text-base">{{ title }}</h1>

    <NuxtLink to="/notifications" class="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5" aria-label="Notifications">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 19a2 2 0 0 0 4 0" stroke-linecap="round" />
      </svg>
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title?: string; showBack?: boolean }>(), { title: '', showBack: false });
</script>
