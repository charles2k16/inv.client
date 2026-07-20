<template>
  <div>
    <p class="eyebrow">Security</p>
    <h1 class="mt-1 font-display text-2xl">Active sessions</h1>
    <p class="mt-1.5 text-sm leading-relaxed text-ink/60">
      The backend already tracks a `Session` row per login with device label, IP and last-active time
      (Phase 3 schema) — this screen just doesn't have its `mySessions` query and revoke button wired up yet.
    </p>
    <div class="mt-6 rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/45">
      Coming soon
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth', title: 'Sessions', showBack: true });
</script>
