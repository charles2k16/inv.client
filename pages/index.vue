<template>
  <div class="flex min-h-screen items-center justify-center">
    <SkeletonBlock class-name="h-6 w-24" />
  </div>
</template>

<script setup lang="ts">
// Root path is a pure redirect, resolved client-side (no layout needed) —
// authenticated users land on /dashboard, everyone else on /login.
definePageMeta({ layout: false });

const token = useCookie('ferrow_access_token');
await navigateTo(token.value ? '/dashboard' : '/login');
</script>
