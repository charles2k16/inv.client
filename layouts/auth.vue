<template>
  <div class="flex min-h-screen items-center justify-center bg-ink/[0.04] px-5 py-10">
    <div class="w-full max-w-[400px]">
      <div class="mb-8 flex justify-center">
        <FerrowLogo :size="26" />
      </div>
      <div class="rounded-2xl bg-paper p-7 shadow-[0_1px_3px_rgba(22,36,27,0.08)]">
        <slot />
      </div>
      <p class="mt-6 text-center font-mono text-[11px] uppercase tracking-wide text-ink/35">
        GHS · Forex · Crypto · Agriculture
      </p>
    </div>
  </div>
</template>
