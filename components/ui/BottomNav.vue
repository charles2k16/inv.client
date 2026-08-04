<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-paper/95 backdrop-blur pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    aria-label="Primary"
  >
    <div class="mx-auto flex max-w-[430px] items-stretch justify-between px-2">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-bold"
        :class="isActive(item.to) ? 'text-forest' : 'text-ink/45'"
      >
        <component :is="item.icon" class="h-5 w-5" />
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { h } from 'vue';

const route = useRoute();
function isActive(to: string) {
  return to === '/dashboard' ? route.path === '/dashboard' : route.path.startsWith(to);
}

// Minimal inline icon set (no icon dependency needed for five glyphs) —
// each a simple stroked SVG consistent with the ledger-line aesthetic.
const HomeIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
  h('path', { d: 'M4 11.5 12 4l8 7.5M6 10v9h12v-9', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
]);
const SeedlingIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
  h('path', { d: 'M12 20V11M12 11c0-3.5-2.5-6-7-6 0 4 2 7 7 7Zm0 0c0-4 2.5-7 7-7 0 4.5-2.5 7-7 7Z', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
]);
const WalletIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
  h('rect', { x: 3.5, y: 6.5, width: 17, height: 12, rx: 2 }),
  h('path', { d: 'M3.5 10h17M15 14.5h3', 'stroke-linecap': 'round' }),
]);
const ReferralIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
  h('circle', { cx: 8, cy: 9, r: 3 }),
  h('path', { d: 'M3 20c0-3 2-5 5-5s5 2 5 5M16 8.5a2.5 2.5 0 1 0 0-5M15 20c0-2.5 1.5-4 4-4', 'stroke-linecap': 'round' }),
]);
const ProfileIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
  h('circle', { cx: 12, cy: 8, r: 3.4 }),
  h('path', { d: 'M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6', 'stroke-linecap': 'round' }),
]);

const items = [
  { to: '/dashboard', label: 'Home', icon: HomeIcon },
  { to: '/invest', label: 'Invest', icon: SeedlingIcon },
  { to: '/wallet', label: 'Wallet', icon: WalletIcon },
  { to: '/referrals', label: 'Referrals', icon: ReferralIcon },
  { to: '/profile', label: 'Profile', icon: ProfileIcon },
];
</script>
