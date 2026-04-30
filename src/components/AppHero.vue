<template>
  <header class="hero">
    <h1>V+ <span>Pipeline</span></h1>
    <p>Modern Vue 3.5 Build System</p>
  </header>
</template>

<style scoped>
.hero {
  padding: 4rem 2rem;
  text-align: center;

  h1 {
    font-size: clamp(2rem, 8vw, 3.5rem);
    font-weight: 800;
    color: var(--text-h);
    letter-spacing: -0.02em;
    margin: 0;

    span {
      color: var(--accent);
    }
  }

  p {
    margin-top: 0.5rem;
    color: var(--text);
    font-weight: 500;
  }
}
</style>
