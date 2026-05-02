<template>
  <div
    data-testid="not-found-container"
    class="m-auto flex flex-col items-center text-center max-w-md animate-fade"
  >
    <span
      class="mb-4 rounded-lg border border-border px-3 py-1 text-xs font-mono text-text/60 bg-bg/50 backdrop-blur-sm"
    >
      STATUS_404
    </span>

    <h1 class="text-text-h text-4xl font-black tracking-tighter">Lost in the tall grass?</h1>

    <p class="mt-3 text-lg font-semibold text-text">This page doesn't exist.</p>

    <div
      class="mt-8 text-7xl select-none transition-transform hover:-translate-y-2 hover:scale-110 duration-normal cursor-default"
    >
      🤔
    </div>

    <p class="mt-6 text-sm text-text/70 leading-relaxed">
      It seems you've wandered off the path. Even the best Trainers get lost sometimes! Let's get
      you back to the Pokedex.
    </p>

    <router-link
      to="/"
      class="mt-10 inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-accent text-white font-bold tracking-tight shadow-xl shadow-accent/30 hover:bg-accent/90 hover:-translate-y-0.5 active:scale-95 transition-all"
    >
      Back to Safety
    </router-link>
  </div>
</template>
