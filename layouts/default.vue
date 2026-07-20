<template>
  <div class="min-h-screen bg-ink/[0.04]">
    <!--
      Mobile-first shell per the PRD: max-width feels like a phone (390-430px)
      even on desktop, where it simply centers with a soft frame either side
      (Phase 1 "MOBILE FIRST" requirement) rather than stretching content
      wide, which would make a financial dashboard harder to scan, not easier.
    -->
    <div class="mx-auto min-h-screen w-full max-w-[430px] bg-paper shadow-[0_0_40px_rgba(22,36,27,0.06)]">
      <TopBar :title="pageTitle" :show-back="showBack" />
      <main class="px-5 pb-28 pt-5">
        <slot />
      </main>
      <BottomNav />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pageTitle = computed(() => (route.meta.title as string) ?? '');
const showBack = computed(() => Boolean(route.meta.showBack));
</script>
