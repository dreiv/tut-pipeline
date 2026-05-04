<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { Routes } from '@/router'
import type { EvolutionChain } from '@/modules/pokemon/services/schema'

const props = defineProps<{
  evolution: EvolutionChain
}>()

const flattenedChain = computed(() => {
  const chain: { name: string; id: number }[] = []
  let current = props.evolution.chain

  while (current) {
    const id = Number(current.species.url.split('/').filter(Boolean).pop())
    chain.push({ name: current.species.name, id })
    current =
      current.evolves_to && current.evolves_to.length > 0 ? current.evolves_to[0] : (null as any)
  }
  return chain
})
</script>

<template>
  <section v-if="flattenedChain.length > 1" class="pt-12 border-t border-border">
    <h3
      class="text-sm font-black uppercase tracking-widest text-text/60 mb-10 text-center md:text-left"
    >
      Evolution Path
    </h3>

    <div class="flex flex-wrap items-center justify-center gap-6 md:gap-10">
      <template v-for="(step, index) in flattenedChain" :key="step.id">
        <RouterLink
          :to="{ name: Routes.POKEMON_DETAIL, params: { id: step.id } }"
          class="group flex flex-col items-center gap-4"
        >
          <div
            class="w-28 h-28 md:w-36 md:h-36 glass-button !rounded-full p-6 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all"
          >
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png`"
              :alt="step.name"
              class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span
            class="text-xs font-black capitalize tracking-widest text-text/40 group-hover:text-accent transition-colors"
          >
            {{ step.name }}
          </span>
        </RouterLink>

        <div v-if="index < flattenedChain.length - 1" class="text-border hidden sm:block">
          <ArrowRight class="w-6 h-6 opacity-50" />
        </div>
      </template>
    </div>
  </section>
</template>
