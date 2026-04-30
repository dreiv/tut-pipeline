export const VAT_RATE = 0.2; // 20%

export function calculateTotal(price: number, quantity: number = 1, discount: number = 0): number {
  const subtotal = price * quantity;
  const discounted = subtotal - subtotal * discount;
  const total = discounted + discounted * VAT_RATE;

  return Math.round(total * 100) / 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
