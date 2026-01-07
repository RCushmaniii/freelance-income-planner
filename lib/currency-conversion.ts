import { Currency } from './store'

export interface ConversionParams {
  amount: number
  fromCurrency: Currency
  toCurrency: Currency
  exchangeRate: number | null
  billingCurrency?: Currency // Optional: helps determine rate direction
  spendingCurrency?: Currency // Optional: helps determine rate direction
}

/**
 * Validate exchange rate
 */
function isValidExchangeRate(rate: number | null): rate is number {
  return rate !== null && rate > 0 && isFinite(rate)
}

/**
 * Validate amount
 */
function isValidAmount(amount: number): boolean {
  return isFinite(amount) && !isNaN(amount)
}

/**
 * Convert an amount from one currency to another using the provided exchange rate
 * 
 * EXCHANGE RATE INTERPRETATION:
 * The exchangeRate always represents: "1 billingCurrency = X spendingCurrency"
 * This is what the user enters in the UI: "1 {billing} = ? {spending}"
 * 
 * EXAMPLES:
 * 
 * Example 1: billing=USD, spending=MXN, rate=18.50
 *   User entered: "1 USD = 18.50 MXN"
 *   
 *   Converting USD → MXN:
 *     $100 USD * 18.50 = $1,850 MXN ✓
 *   
 *   Converting MXN → USD:
 *     $1,850 MXN / 18.50 = $100 USD ✓
 * 
 * Example 2: billing=USD, spending=EUR, rate=0.92
 *   User entered: "1 USD = 0.92 EUR"
 *   
 *   Converting USD → EUR:
 *     $100 USD * 0.92 = €92 EUR ✓
 *   
 *   Converting EUR → USD:
 *     €92 EUR / 0.92 = $100 USD ✓
 * 
 * Example 3: billing=EUR, spending=MXN, rate=20.00
 *   User entered: "1 EUR = 20.00 MXN"
 *   
 *   Converting EUR → MXN:
 *     €100 EUR * 20.00 = $2,000 MXN ✓
 *   
 *   Converting MXN → EUR:
 *     $2,000 MXN / 20.00 = €100 EUR ✓
 * 
 * THE ALGORITHM:
 * 1. If converting FROM billing TO spending: multiply by rate
 * 2. If converting FROM spending TO billing: divide by rate
 * 3. If billing/spending context not provided, use fallback heuristic
 * 
 * @param params - Conversion parameters
 * @returns Converted amount, or original amount if conversion not possible
 */
export function convertCurrency(params: ConversionParams): number {
  const { amount, fromCurrency, toCurrency, exchangeRate, billingCurrency, spendingCurrency } = params

  // Validate amount
  if (!isValidAmount(amount)) {
    console.warn('Invalid amount for currency conversion:', amount)
    return 0
  }

  // No conversion needed if currencies are the same
  if (fromCurrency === toCurrency) {
    return amount
  }

  // Can't convert without a valid exchange rate
  if (!isValidExchangeRate(exchangeRate)) {
    console.warn('Invalid exchange rate for currency conversion:', exchangeRate)
    return amount // Return original amount as fallback
  }

  // PREFERRED METHOD: Use billing/spending context if provided
  if (billingCurrency && spendingCurrency) {
    // Converting FROM billing TO spending: multiply
    if (fromCurrency === billingCurrency && toCurrency === spendingCurrency) {
      return amount * exchangeRate
    }
    
    // Converting FROM spending TO billing: divide
    if (fromCurrency === spendingCurrency && toCurrency === billingCurrency) {
      return amount / exchangeRate
    }
    
    // If neither matches, fall through to heuristic
    console.warn('Currency pair does not match billing/spending context')
  }

  // FALLBACK METHOD: Use currency strength heuristic
  // This handles cases where billing/spending context isn't provided
  // Assumption: Rate is always quoted as "stronger currency = X weaker currency"
  const currencyStrength: Record<Currency, number> = {
    USD: 1,  // Strongest
    EUR: 2,  // Medium
    MXN: 3,  // Weakest
  }

  const fromStrength = currencyStrength[fromCurrency]
  const toStrength = currencyStrength[toCurrency]

  // Converting from stronger to weaker: multiply (e.g., USD → MXN)
  if (fromStrength < toStrength) {
    return amount * exchangeRate
  }

  // Converting from weaker to stronger: divide (e.g., MXN → USD)
  if (fromStrength > toStrength) {
    return amount / exchangeRate
  }

  // Same strength (shouldn't happen)
  console.warn('Unexpected: same currency strength')
  return amount * exchangeRate
}

/**
 * Get the effective exchange rate between two currencies
 * Returns 1 if currencies are the same or conversion not supported
 * 
 * This is a helper function that's not currently used but kept for potential future use.
 */
export function getExchangeRate(
  fromCurrency: Currency,
  toCurrency: Currency,
  userExchangeRate: number | null
): number {
  if (fromCurrency === toCurrency) {
    return 1
  }

  if (!isValidExchangeRate(userExchangeRate)) {
    return 1
  }

  return userExchangeRate
}
