<template>
  <section class="calculator-ui">
    <div class="main-display">
      <span class="label">Total Amount</span>
      <h2 class="price-hero">{{ formatCurrency(total) }}</h2>
    </div>

    <div class="config-row">
      <div class="control-group">
        <label>Items</label>
        <div class="stepper">
          <button @click="qty > 1 && qty--" aria-label="Decrease">−</button>
          <span class="count">{{ qty }}</span>
          <button @click="qty++" aria-label="Increase">+</button>
        </div>
      </div>

      <div class="info-group">
        <label>Tax (VAT)</label>
        <span class="value">20% included</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { calculateTotal, formatCurrency } from "@/utils";

const qty = ref(1);
const unitPrice = 99.0;
const total = computed(() => calculateTotal(unitPrice, qty.value));
</script>

<style scoped>
.calculator-ui {
  width: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.main-display {
  text-align: center;
  .label {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent);
  }
  .price-hero {
    margin: 0.5rem 0 0;
    font-size: 4rem;
    font-weight: 800;
    color: var(--text-h);
    letter-spacing: -0.04em;
  }
}

.config-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: var(--accent-bg);
  border-radius: 24px;
}

.control-group,
.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-h);
  }
}

.stepper {
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--zinc-200);
    background: var(--bg);
    color: var(--text-h);
    cursor: pointer;
    font-size: 1.2rem;
    display: grid;
    place-items: center;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-1px);
    }
  }

  .count {
    font-family: "JetBrains Mono", monospace;
    font-size: 1.25rem;
    font-weight: 700;
    min-width: 2ch;
    text-align: center;
  }
}

.value {
  font-size: 1rem;
  color: var(--text);
  padding: 6px 0;
}

@media (max-width: 480px) {
  .config-row {
    grid-template-columns: 1fr;
  }
  .main-display .price-hero {
    font-size: 3rem;
  }
}
</style>
