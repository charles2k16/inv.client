<template>
  <div>
    <p class="eyebrow">Account</p>
    <h1 class="mt-1 font-display text-2xl">Edit profile</h1>

    <div v-if="loading" class="mt-6"><SkeletonBlock class-name="h-32 w-full rounded-2xl" /></div>

    <form v-else class="mt-6 space-y-4" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-3">
        <AppInput v-model="firstName" label="First name" />
        <AppInput v-model="lastName" label="Last name" />
      </div>
      <AppInput :model-value="user?.mobileNumber ?? ''" label="Mobile number" disabled hint="Contact support to change your mobile number." />

      <p v-if="saved" class="text-sm text-forest">Saved.</p>
      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>

      <AppButton type="submit" :loading="saving">Save changes</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import { ME, UPDATE_PROFILE } from '~/graphql/auth';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Edit profile', showBack: true });

const { result, loading } = useQuery(ME);
const user = computed(() => result.value?.me);

const firstName = ref('');
const lastName = ref('');
watchEffect(() => {
  if (user.value) {
    firstName.value = user.value.firstName;
    lastName.value = user.value.lastName;
  }
});

const saving = ref(false);
const saved = ref(false);
const formError = ref('');
const { mutate: updateProfile } = useMutation(UPDATE_PROFILE);

async function submit() {
  saving.value = true;
  saved.value = false;
  formError.value = '';
  try {
    const res = await updateProfile({ input: { firstName: firstName.value, lastName: lastName.value } });
    if (!res?.data?.updateProfile?.success) {
      formError.value = 'Could not save changes.';
      return;
    }
    saved.value = true;
  } finally {
    saving.value = false;
  }
}
</script>
