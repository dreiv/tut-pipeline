<script setup lang="ts">
const { message = 'Something went wrong on our end.', code = 500 } = defineProps<{
  message?: string
  code?: number | string
}>()
</script>

<template>
  <div class="m-auto flex flex-col items-center text-center">
    <span class="mb-4 rounded-md border border-border px-2 py-0.5 text-xs font-mono opacity-60">
      Error {{ code }}
    </span>

    <h1 class="text-text-h text-4xl font-black tracking-tight">Internal Server Error</h1>

    <p class="mt-2 text-lg font-medium">
      {{ message }}
    </p>

    <div class="mt-8 text-6xl transition-transform hover:scale-110">😵</div>

    <p class="mt-6 max-w-xs text-sm opacity-80">
      The Pokemon database seems to be having a bit of a crisis. Please try again in a few minutes.
    </p>

    <router-link
      to="/"
      class="mt-10 rounded-full bg-accent px-6 py-2 font-bold text-white shadow-soft transition-all hover:bg-accent/90 hover:shadow-md active:scale-95"
    >
      Return to Safety
    </router-link>
  </div>
</template>
