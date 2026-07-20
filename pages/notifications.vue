<template>
  <div>
    <p class="eyebrow">Updates</p>
    <h1 class="mt-1 font-display text-2xl">Notifications</h1>
    <p class="mt-1.5 text-sm leading-relaxed text-ink/60">
      The schema for this screen exists (`Notification` / `NotificationRecipient`, Phase 3), but the
      notifications module's queries and delivery pipeline aren't implemented yet in this backend slice —
      see `apps/api/README.md`. Nothing will appear here until that module is built.
    </p>
    <div class="mt-6 rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/45">
      No notifications yet
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth', title: 'Notifications', showBack: true });
</script>
