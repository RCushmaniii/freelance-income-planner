import { Currency } from './store'

export interface ConversionParams {
  amount: number
  fromCurrency: Currency
  toCurrency: Currency
  exchangeRate: number | null
}

/**
 * Convert an amount from one currency to another using the provided exchange rate
 * 
 * @param params - Conversion parameters
 * @returns Converted amount, or original amount if conversion not possible
 */
export function convertCurrency(params: ConversionParams): number {
  const { amount, fromCurrency, toCurrency, exchangeRate } = params

  // No conversion needed if currencies are the same
  if (fromCurrency === toCurrency) {
    return amount
  }

  // Can't convert without an exchange rate
  if (!exchangeRate || exchangeRate <= 0) {
    return amount
  }

  // Handle USD <-> MXN conversions
  if (fromCurrency === 'USD' && toCurrency === 'MXN') {
    return amount * exchangeRate
  }

  if (fromCurrency === 'MXN' && toCurrency === 'USD') {
    return amount / exchangeRate
  }

  // For other currency pairs, return original amount
  // In the future, this could be extended to handle more currency pairs
  return amount
}

/**
 * Get the effective exchange rate between two currencies
 * Returns 1 if currencies are the same or conversion not supported
 */
export function getExchangeRate(
  fromCurrency: Currency,
  toCurrency: Currency,
  userExchangeRate: number | null
): number {
  if (fromCurrency === toCurrency) {
    return 1
  }

  if (!userExchangeRate || userExchangeRate <= 0) {
    return 1
  }

  if (fromCurrency === 'USD' && toCurrency === 'MXN') {
    return userExchangeRate
  }

  if (fromCurrency === 'MXN' && toCurrency === 'USD') {
    return 1 / userExchangeRate
  }

  return 1
}
