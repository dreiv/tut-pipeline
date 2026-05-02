<script setup lang="ts">
const { message = 'Something went wrong on our end.', code = 500 } = defineProps<{
  message?: string
  code?: number | string
}>()
</script>

<template>
  <div class="m-auto flex flex-col items-center text-center max-w-md animate-fade">
    <span class="mb-4 rounded-lg border border-border px-3 py-1 text-xs font-mono text-text/60">
      CODE_{{ code }}
    </span>

    <h1 class="text-text-h text-4xl font-black tracking-tighter">Oops! Problem detected</h1>

    <p class="mt-3 text-lg font-semibold text-text">
      {{ message }}
    </p>

    <div class="mt-8 text-7xl select-none transition-transform hover:rotate-12 duration-normal">
      😵‍💫
    </div>

    <p class="mt-6 text-sm text-text/70 leading-relaxed">
      The Pokemon database seems to be having a bit of a crisis. Please try again in a few minutes.
    </p>

    <router-link
      to="/"
      class="mt-10 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-accent text-white font-bold tracking-tight shadow-lg shadow-accent/20 hover:bg-accent/90 hover:-translate-y-0.5 active:scale-95 transition-all"
    >
      Return to Safety
    </router-link>
  </div>
</template>
