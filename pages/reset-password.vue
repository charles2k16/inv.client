<script setup lang="ts">
// SMS password reset retired — reset PIN with password instead.
definePageMeta({ layout: 'auth' });
await navigateTo('/forgot-pin');
</script>
