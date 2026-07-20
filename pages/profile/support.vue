<template>
  <div>
    <p class="eyebrow">Help</p>
    <h1 class="mt-1 font-display text-2xl">Support</h1>
    <p class="mt-1.5 text-sm leading-relaxed text-ink/60">
      In-app tickets aren't built yet in this slice (Phase 4 designs `createSupportTicket` /
      `mySupportTickets`) — in the meantime, reach us directly.
    </p>
    <a href="mailto:support@ferrow.example" class="mt-6 block rounded-2xl border border-ink/10 p-5 text-center font-mono text-sm text-forest">
      support@ferrow.example
    </a>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth', title: 'Support', showBack: true });
</script>
