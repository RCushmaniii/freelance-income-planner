import { NextResponse } from 'next/server'

/**
 * Currencies this app actually supports (see lib/calculations.ts).
 *
 * This is the rate limit for this route, and it is a better one than a
 * per-caller cap would be.
 *
 * The route is public and spends EXCHANGE_RATE_API_KEY against a metered
 * third-party quota. The previous check was /^[A-Z]{3}$/, which accepts 17,576
 * strings. Each distinct `base` is its own Next fetch-cache key, so each one
 * reached upstream — meaning a single client walking AAA..ZZZ could burn 17,576
 * upstream calls despite the hour-long cache doing exactly what it was meant to.
 *
 * Bounding the input instead bounds the fan-out: at most one upstream call per
 * supported base per hour, no matter how much traffic arrives or from how many
 * addresses. A per-IP limiter would not have achieved that — it caps each
 * caller, not the total number of distinct upstream requests, and it would have
 * needed a shared datastore this app does not have.
 *
 * Adding a currency here means adding it to the planner too; keep the two in
 * step.
 */
const SUPPORTED_CURRENCIES = new Set(['USD', 'MXN', 'EUR'])

function isCurrencyCode(value: string): boolean {
  return SUPPORTED_CURRENCIES.has(value)
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const baseParam = url.searchParams.get('base') ?? 'MXN'
    const targetParam = url.searchParams.get('target') ?? 'USD'

    const base = baseParam.toUpperCase()
    const target = targetParam.toUpperCase()

    if (!isCurrencyCode(base) || !isCurrencyCode(target)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported currency. Supported: ${[...SUPPORTED_CURRENCIES].join(', ')}`,
        },
        { status: 400 }
      )
    }

    const apiKey = process.env.EXCHANGE_RATE_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Missing EXCHANGE_RATE_API_KEY' },
        { status: 500 }
      )
    }

    const endpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`

    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 60,
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `ExchangeRate API error: ${res.status}` },
        { status: 502 }
      )
    }

    const data: any = await res.json()

    if (data?.result !== 'success') {
      return NextResponse.json(
        { success: false, error: data?.['error-type'] ?? 'Unknown error' },
        { status: 502 }
      )
    }

    const rate = data?.conversion_rates?.[target]
    if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
      return NextResponse.json(
        { success: false, error: 'Missing conversion rate' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        base,
        target,
        rate,
        timeLastUpdateUnix: data?.time_last_update_unix ?? null,
        timeLastUpdateUtc: data?.time_last_update_utc ?? null,
      },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch exchange rate' },
      { status: 500 }
    )
  }
}
