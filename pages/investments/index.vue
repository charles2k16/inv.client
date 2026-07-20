<template>
  <div>
    <p class="eyebrow">Your investments</p>
    <h1 class="mt-1 font-display text-2xl">All investments</h1>

    <div class="mt-5 flex gap-1.5 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium"
        :class="activeTab === tab.value ? 'bg-forest text-paper' : 'bg-ink/6 text-ink/55'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="loading" class="mt-5 space-y-2.5">
      <SkeletonBlock class-name="h-20 w-full rounded-xl" />
      <SkeletonBlock class-name="h-20 w-full rounded-xl" />
    </div>

    <div v-else class="mt-5 space-y-2.5">
      <InvestmentListItem
        v-for="inv in filtered"
        :key="inv.id"
        :id="inv.id"
        :plan-name="inv.plan.name"
        :category-name="inv.plan.category.name"
        :amount="inv.amount"
        :status="inv.status"
        :distribution-frequency="inv.distributionFrequency"
      />
      <div v-if="filtered.length === 0" class="rounded-2xl border border-dashed border-ink/15 p-6 text-center">
        <p class="text-sm text-ink/50">Nothing here yet.</p>
        <NuxtLink to="/invest" class="mt-2 inline-block text-sm font-medium text-forest">Start investing →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { MY_INVESTMENTS } from '~/graphql/investments';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Investments' });

const { result, loading } = useQuery(MY_INVESTMENTS);
const investments = computed<any[]>(() => result.value?.myInvestments ?? []);

const tabs = [
  { value: 'ALL', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
];
const activeTab = ref('ALL');

const filtered = computed(() => {
  if (activeTab.value === 'ALL') return investments.value;
  if (activeTab.value === 'PENDING') {
    return investments.value.filter((i) => i.status === 'PENDING_PAYMENT' || i.status === 'PENDING_APPROVAL');
  }
  return investments.value.filter((i) => i.status === activeTab.value);
});
</script>
