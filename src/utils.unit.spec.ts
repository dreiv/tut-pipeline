import { describe, it, expect } from 'vitest'
import { calculateTotal, formatCurrency, VAT_RATE } from './utils.ts'

describe('Price Utilities', () => {
  it('calculateTotal adds VAT correctly', () => {
    // Basic calculation: 100 * 1 + 20% VAT = 120
    const result = calculateTotal(100, 1, 0)
    expect(result).toBe(120)
  })

  it('calculateTotal applies discount before VAT', () => {
    // 100 - 10% discount = 90.
    // 90 + 20% VAT (18) = 108
    const result = calculateTotal(100, 1, 0.1)
    expect(result).toBe(108)
  })

  it('calculateTotal handles quantities', () => {
    // (50 * 2) + 20% VAT = 120
    const result = calculateTotal(50, 2, 0)
    expect(result).toBe(120)
  })

  it('formatCurrency returns a formatted string', () => {
    // Note: We use a regex or contain because different environments
    // might render spaces/symbols slightly differently in Intl
    expect(formatCurrency(120)).toContain('$120.00')
  })

  it('VAT_RATE is constant at 20%', () => {
    expect(VAT_RATE).toBe(0.2)
  })
})
