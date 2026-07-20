<template>
  <div>
    <p class="eyebrow">Account</p>
    <h1 class="mt-1 font-display text-2xl">Profile</h1>

    <div v-if="loading" class="mt-6"><SkeletonBlock class-name="h-40 w-full rounded-2xl" /></div>

    <template v-else-if="user">
      <div class="mt-6 flex items-center gap-4 rounded-2xl border border-ink/10 p-5">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 font-display text-xl text-forest">
          {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
        </div>
        <div>
          <p class="font-display text-lg">{{ user.firstName }} {{ user.lastName }}</p>
          <p class="mt-0.5 font-mono text-xs text-ink/45">{{ user.mobileNumber }}</p>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-between rounded-2xl border border-ink/10 p-5">
        <div>
          <p class="text-sm">Identity verification (KYC)</p>
          <p class="mt-0.5 text-xs text-ink/45">Required before withdrawals above the review threshold.</p>
        </div>
        <StatusBadge :status="user.kycStatus" />
      </div>

      <div class="mt-5 divide-y divide-ink/8 rounded-2xl border border-ink/10">
        <NuxtLink to="/profile/edit" class="flex items-center justify-between px-5 py-4 text-sm">
          Edit profile
          <span class="text-ink/30">›</span>
        </NuxtLink>
        <NuxtLink to="/profile/sessions" class="flex items-center justify-between px-5 py-4 text-sm">
          Active sessions
          <span class="text-ink/30">›</span>
        </NuxtLink>
        <NuxtLink to="/profile/support" class="flex items-center justify-between px-5 py-4 text-sm">
          Support
          <span class="text-ink/30">›</span>
        </NuxtLink>
      </div>

      <div class="mt-8">
        <AppButton variant="danger" :loading="loggingOut" @click="logout">Log out</AppButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ME } from '~/graphql/auth';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Profile' });

const { result, loading } = useQuery(ME);
const user = computed(() => result.value?.me);

const LOGOUT = gql`
  mutation Logout {
    logout {
      success
      errors { message }
    }
  }
`;
const { mutate: logoutMutation } = useMutation(LOGOUT);
const authStore = useAuthStore();
const loggingOut = ref(false);

async function logout() {
  loggingOut.value = true;
  try {
    await logoutMutation();
  } finally {
    authStore.clearSession();
    await navigateTo('/login');
    loggingOut.value = false;
  }
}
</script>
