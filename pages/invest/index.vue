<template>
  <div>
    <p class="eyebrow">Choose a field</p>
    <h1 class="mt-1 font-display text-2xl">Where would you like to invest?</h1>
    <p class="mt-1.5 text-sm text-ink/55">Every field publishes its target rate before you commit.</p>

    <div v-if="loading" class="mt-6 space-y-3">
      <SkeletonBlock class-name="h-24 w-full rounded-2xl" />
      <SkeletonBlock class-name="h-24 w-full rounded-2xl" />
      <SkeletonBlock class-name="h-24 w-full rounded-2xl" />
    </div>

    <div v-else class="mt-6 space-y-3">
      <CategoryTile
        v-for="cat in categories"
        :key="cat.id"
        :type="cat.type"
        :label="meta[cat.type].label"
        :title="cat.name"
        :min-amount="meta[cat.type].minAmount"
        :risk="meta[cat.type].risk"
        :accent="meta[cat.type].accent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { INVESTMENT_CATEGORIES } from '~/graphql/investments';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Invest' });

const { result, loading } = useQuery(INVESTMENT_CATEGORIES);
const categories = computed(() => (result.value?.investmentCategories ?? []).filter((c: any) => c.isActive));

// Display-only metadata per category type (label numbering, headline
// starting amount, risk badge, accent colour) — kept here rather than on
// the InvestmentCategory schema itself, since it's presentational, not
// business data the admin needs to configure (Phase 3's InvestmentCategory
// model intentionally has no "display accent colour" column).
const meta: Record<string, { label: string; minAmount: string; risk: string; accent: string }> = {
  FOREX: { label: 'Field 01', minAmount: '500', risk: 'Medium', accent: '#3E6B8A' },
  CRYPTO: { label: 'Field 02', minAmount: '200', risk: 'Medium', accent: '#B8863A' },
  AGRICULTURE: { label: 'Field 03', minAmount: '200', risk: 'Low', accent: '#8B5A2B' },
};
</script>
