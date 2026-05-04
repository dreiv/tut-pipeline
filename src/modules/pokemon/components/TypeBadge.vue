<script setup lang="ts">
const typeEmojiMap: Record<string, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '🌊',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '💥',
  poison: '🧪',
  ground: '🏜️',
  flying: '💨',
  psychic: '🔮',
  bug: '🐝',
  rock: '⛰️',
  ghost: '👻',
  dragon: '🐲',
  dark: '🌙',
  steel: '⚙️',
  fairy: '✨',
}

defineProps<{
  typeName: string
  showLabel?: boolean
}>()
</script>

<template>
  <div
    :title="typeName"
    class="relative group/badge flex items-center justify-center rounded-xl border backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 text-white select-none overflow-hidden"
    :class="[
      showLabel
        ? 'px-4 py-2 gap-3 text-[11px] font-black uppercase tracking-[0.2em]'
        : 'w-12 h-12 text-xl',
    ]"
    :style="{
      borderColor: `var(--color-type-${typeName})50`,
      backgroundColor: `oklch(from var(--color-type-${typeName}) l c h / 0.15)`,
    }"
  >
    <div
      class="absolute inset-0 opacity-20 group-hover/badge:opacity-40 transition-opacity duration-500"
      :style="{
        background: `linear-gradient(45deg, var(--color-type-${typeName}), transparent)`,
      }"
    />

    <span
      class="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-none filter saturate-[1.2]"
    >
      {{ typeEmojiMap[typeName] || '❓' }}
    </span>

    <span v-if="showLabel" class="relative z-10 text-text-h drop-shadow-sm">
      {{ typeName }}
    </span>

    <div
      class="absolute inset-0 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
  </div>
</template>
