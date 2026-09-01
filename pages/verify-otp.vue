<script setup lang="ts">
// OTP / SMS verification retired — use PIN auth instead.
definePageMeta({ layout: 'auth' });
await navigateTo('/login');
</script>
