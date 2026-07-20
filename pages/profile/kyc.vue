<template>
  <div>
    <p class="eyebrow">Verification</p>
    <h1 class="mt-1 font-display text-2xl">Identity verification</h1>
    <p class="mt-1.5 text-sm leading-relaxed text-ink/60">
      Document upload isn't wired up in this build yet — the schema and storage design for it are ready
      (Phase 2 ADR-005: KYC documents go to private object storage, never Postgres directly), but the
      `submitKycDocument` mutation and a file-picker UI still need to be implemented here.
    </p>
    <div class="mt-6 rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/45">
      Coming soon
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth', title: 'Verification', showBack: true });
</script>
