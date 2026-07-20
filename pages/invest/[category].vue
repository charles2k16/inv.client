<template>
  <div>
    <p class="eyebrow">{{ categoryLabel }}</p>
    <h1 class="mt-1 font-display text-2xl">Available plans</h1>

    <div v-if="loading" class="mt-6 space-y-3">
      <SkeletonBlock class-name="h-36 w-full rounded-2xl" />
      <SkeletonBlock class-name="h-36 w-full rounded-2xl" />
    </div>

    <div v-else class="mt-6 space-y-3">
      <PlanCard
        v-for="plan in plans"
        :key="plan.id"
        :id="plan.id"
        :name="plan.name"
        :description="plan.description"
        :monthly-return-percent="plan.monthlyReturnPercent"
        :duration-days="plan.durationDays"
        :min-amount="plan.minAmount"
        :max-amount="plan.maxAmount"
        :risk-level="plan.riskLevel"
      />
      <p v-if="plans.length === 0" class="rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/50">
        No plans are currently available in this field.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { INVESTMENT_PLANS } from '~/graphql/investments';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Plans', showBack: true });

const route = useRoute();
const categoryType = computed(() => (route.params.category as string).toUpperCase());
const categoryLabel = computed(() => categoryType.value.charAt(0) + categoryType.value.slice(1).toLowerCase());

const { result, loading } = useQuery(INVESTMENT_PLANS, () => ({ categoryType: categoryType.value }));
const plans = computed(() => result.value?.investmentPlans ?? []);
</script>
