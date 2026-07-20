<template>
  <div>
    <div v-if="loading">
      <SkeletonBlock class-name="h-48 w-full rounded-2xl" />
    </div>

    <template v-else-if="plan">
      <p class="eyebrow">{{ plan.category.name }}</p>
      <h1 class="mt-1 font-display text-2xl">{{ plan.name }}</h1>
      <p class="mt-1.5 text-sm leading-relaxed text-ink/60">{{ plan.description }}</p>

      <div class="mt-6 rounded-2xl border border-ink/10 p-5">
        <AmountStepper v-model="amount" :min="Number(plan.minAmount)" :max="Number(plan.maxAmount)" :step="Number(plan.stepAmount)" />
      </div>

      <div class="mt-5">
        <p class="text-xs font-medium text-ink/60">Payout frequency</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <button
            v-for="freq in plan.supportedFrequencies"
            :key="freq"
            type="button"
            class="rounded-lg border py-2.5 text-xs font-medium"
            :class="frequency === freq ? 'border-forest bg-forest/10 text-forest' : 'border-ink/15 text-ink/60'"
            @click="frequency = freq"
          >
            {{ freqLabel(freq) }}
          </button>
        </div>
      </div>

      <div class="mt-5">
        <p class="text-xs font-medium text-ink/60">Pay with</p>
        <div class="mt-2 grid grid-cols-3 gap-2">
          <button
            v-for="p in providers"
            :key="p.value"
            type="button"
            class="rounded-lg border py-2.5 text-xs font-medium"
            :class="providerCode === p.value ? 'border-forest bg-forest/10 text-forest' : 'border-ink/15 text-ink/60'"
            @click="providerCode = p.value"
          >
            {{ p.label }}
          </button>
        </div>
      </div>

      <div class="mt-6 rounded-2xl bg-forest/6 p-5">
        <p class="eyebrow">Projected earnings</p>
        <div class="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p class="font-mono text-lg tabular text-forest">GHS {{ formatMoney(monthlyTargetReturn) }}</p>
            <p class="mt-0.5 text-[11px] text-ink/45">monthly target</p>
          </div>
          <div>
            <p class="font-mono text-lg tabular text-forest">GHS {{ formatMoney(totalProjected) }}</p>
            <p class="mt-0.5 text-[11px] text-ink/45">over {{ plan.durationDays }} days</p>
          </div>
        </div>
        <p class="mt-3 font-mono text-[10px] uppercase tracking-wide text-ink/35">Target, not guaranteed.</p>
      </div>

      <p v-if="formError" class="mt-4 text-sm text-red-600">{{ formError }}</p>

      <div class="mt-6">
        <AppButton :loading="submitting" @click="submit">Invest GHS {{ formatMoney(amount) }}</AppButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable';
import { INVESTMENT_PLAN, CREATE_INVESTMENT } from '~/graphql/investments';
import { formatMoney } from '~/utils/money';

definePageMeta({ layout: 'default', middleware: 'auth', title: 'Invest', showBack: true });

const route = useRoute();
const planId = route.params.id as string;

const { result, loading } = useQuery(INVESTMENT_PLAN, { id: planId });
const plan = computed(() => result.value?.investmentPlan);

const amount = ref(0);
const frequency = ref('');
const providerCode = ref('MTN_MOMO');
const formError = ref('');
const submitting = ref(false);

watchEffect(() => {
  if (plan.value && amount.value === 0) {
    amount.value = Number(plan.value.minAmount);
    frequency.value = plan.value.supportedFrequencies[0];
  }
});

const providers = [
  { value: 'MTN_MOMO', label: 'MTN MoMo' },
  { value: 'VODAFONE_CASH', label: 'Vodafone Cash' },
  { value: 'AIRTELTIGO_MONEY', label: 'AirtelTigo' },
];

function freqLabel(freq: string) {
  return { DAILY: 'Daily', WEEKLY: 'Weekly', MONTHLY: 'Monthly', END_OF_TERM: 'End of term' }[freq] ?? freq;
}

// Mirrors the exact server-side formula (Phase 1 PRD, apps/api
// modules/investments/service.ts) so the number shown here never
// surprises the user once the server confirms it — but the server's
// calculation remains authoritative regardless (Phase 4 §7).
const monthlyTargetReturn = computed(() => (amount.value * Number(plan.value?.monthlyReturnPercent ?? 0)) / 100);
const totalProjected = computed(() => monthlyTargetReturn.value * ((plan.value?.durationDays ?? 30) / 30));

const { mutate: createInvestment } = useMutation(CREATE_INVESTMENT);

async function submit() {
  formError.value = '';
  submitting.value = true;
  try {
    const res = await createInvestment({
      input: {
        planId,
        amount: String(amount.value),
        distributionFrequency: frequency.value,
        providerCode: providerCode.value,
      },
    });
    const payload = res?.data?.createInvestment;
    if (!payload?.success) {
      formError.value = payload?.errors?.[0]?.message ?? 'Could not create this investment.';
      return;
    }
    await navigateTo(`/investments/${payload.investment.id}`);
  } finally {
    submitting.value = false;
  }
}
</script>
