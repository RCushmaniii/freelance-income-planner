export type Language = 'en' | 'es'

export interface Translations {
  // Navigation & Header
  header: {
    title: string
    incomePlanner: string
  }

  // Home Page
  home: {
    tagline: string
    headline: string
    subheading: string
    ctaPrimary: string
    ctaSecondary: string
    features: {
      fast: {
        title: string
        description: string
      }
      realUse: {
        title: string
        description: string
      }
      personal: {
        title: string
        description: string
      }
    }
  }

  // Income Planner - Hero
  hero: {
    title: string
    subtitle: string
    note: string
  }

  // View Toggle
  viewToggle: {
    snapshot: string
    forecast: string
  }

  // Input Panel
  inputs: {
    title: string
    hourlyRate: string
    hoursPerWeek: string
    vacationWeeks: string
    taxRate: string
    targetAnnualNet: string
    targetOptional: string
    targetPlaceholder: string
    currency: string
    language: string
    rangeLabel: string
  }

  // Summary Cards
  summary: {
    title: string
    perDay: string
    perWeek: string
    perMonth: string
    perYear: string
    gross: string
    net: string
    netAfterTax: string
    whatIf: string
    whatIfText: string
  }

  // Scenario Builder
  scenarios: {
    title: string
    pessimistic: string
    pessimisticDesc: string
    realistic: string
    realisticDesc: string
    optimistic: string
    optimisticDesc: string
    sharedTaxRate: string
  }

  // Range Visualization
  range: {
    title: string
    incomeSpread: string
    range: string
  }

  // Monthly Chart
  chart: {
    title: string
    steady: string
    q4Heavy: string
    summerSlow: string
    steadyDesc: string
    q4HeavyDesc: string
    summerSlowDesc: string
  }

  // Insights
  insights: {
    title: string
    realisticIncome: string
    incomeRange: string
    capacityWarning: string
    pessimisticFloor: string
    rateIncrease: string
    spread: string
  }

  // Toast Messages
  toast: {
    currencyChanged: string
    languageChanged: string
    languageChangedEs: string
  }

  // Chart Placeholder
  chartPlaceholder: {
    title: string
    comingSoon: string
  }

  // Common
  common: {
    loading: string
    error: string
    reset: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: 'CushLabs.ai',
      incomePlanner: 'Income Planner',
    },

    home: {
      tagline: 'CUSHLABS.AI',
      headline: 'AI Integration & Modern Software Development for SMBs',
      subheading:
        'I help businesses leverage AI, automate workflows, and build modern tools that are ready for real-world use.',
      ctaPrimary: 'Try Income Planner',
      ctaSecondary: 'View Projects',
      features: {
        fast: {
          title: 'Fast Delivery',
          description:
            'Production-ready systems in weeks, not months. Direct access, no handoffs.',
        },
        realUse: {
          title: 'Built for Real Use',
          description:
            'Clean code, proper testing, and documentation. No shortcuts or prototypes.',
        },
        personal: {
          title: 'Personal & Direct',
          description:
            'One experienced builder. 25+ years of enterprise depth. You work directly with me.',
        },
      },
    },

    hero: {
      title: 'Income Planner',
      subtitle:
        'Plan your income like a pro. Adjust your rate, hours, and taxes to see what you can realistically earn per year.',
      note: 'Built by Robert Cushman for freelancers, consultants, and solo founders who want clarity on their numbers.',
    },

    viewToggle: {
      snapshot: 'Snapshot',
      forecast: 'Forecast',
    },

    inputs: {
      title: 'Your Inputs',
      hourlyRate: 'Hourly Rate',
      hoursPerWeek: 'Billable Hours per Week',
      vacationWeeks: 'Vacation Weeks per Year',
      taxRate: 'Tax Rate (%)',
      targetAnnualNet: 'Target Annual Net Income',
      targetOptional: '(optional)',
      targetPlaceholder: 'Leave blank to calculate from inputs',
      currency: 'Currency',
      language: 'Language',
      rangeLabel: 'Range',
    },

    summary: {
      title: 'Your Income',
      perDay: 'Per Day',
      perWeek: 'Per Week',
      perMonth: 'Per Month',
      perYear: 'Per Year',
      gross: 'Gross',
      net: 'Net',
      netAfterTax: 'Net (after tax)',
      whatIf: 'What if:',
      whatIfText:
        'If you increased your hourly rate by 10%, you would earn',
    },

    scenarios: {
      title: 'Scenario Builder',
      pessimistic: 'Pessimistic',
      pessimisticDesc: 'Conservative estimate',
      realistic: 'Realistic',
      realisticDesc: 'Most likely outcome',
      optimistic: 'Optimistic',
      optimisticDesc: 'Stretch goal',
      sharedTaxRate: 'Tax Rate (shared across all scenarios)',
    },

    range: {
      title: 'Annual Income Range',
      incomeSpread: 'Income Spread',
      range: 'Range',
    },

    chart: {
      title: 'Monthly Income Projection',
      steady: 'Steady',
      q4Heavy: 'Q4 Heavy',
      summerSlow: 'Summer Slow',
      steadyDesc:
        'Steady: Consistent income throughout the year with no seasonal variation.',
      q4HeavyDesc:
        'Q4 Heavy: Higher income in Q4 (Oct-Dec) due to year-end projects and budget spending. Common for consultants and B2B services.',
      summerSlowDesc:
        'Summer Slow: Reduced income in summer months (Jun-Aug) when clients take vacations. Common for many service businesses.',
    },

    insights: {
      title: 'Key Insights',
      realisticIncome: 'Your realistic annual income:',
      incomeRange: 'Income range:',
      capacityWarning:
        'Optimistic scenario requires {hours} hrs/week - near max capacity. Consider raising rates instead.',
      pessimisticFloor:
        'Even in pessimistic case, you earn {amount} - that is your income floor.',
      rateIncrease:
        'A 10% rate increase would add {amount} to your annual income.',
      spread: 'spread',
    },

    toast: {
      currencyChanged: 'Currency set to',
      languageChanged: 'Language set to English',
      languageChangedEs: 'Idioma cambiado a español',
    },

    chartPlaceholder: {
      title: 'Income Chart',
      comingSoon: 'Chart visualization coming soon',
    },

    common: {
      loading: 'Loading...',
      error: 'Error',
      reset: 'Reset',
    },
  },

  es: {
    header: {
      title: 'CushLabs.ai',
      incomePlanner: 'Planificador de Ingresos',
    },

    home: {
      tagline: 'CUSHLABS.AI',
      headline:
        'Integración de IA y Desarrollo de Software Moderno para PyMEs',
      subheading:
        'Ayudo a empresas a aprovechar la IA, automatizar flujos de trabajo y construir herramientas modernas listas para uso real.',
      ctaPrimary: 'Probar Planificador',
      ctaSecondary: 'Ver Proyectos',
      features: {
        fast: {
          title: 'Entrega Rápida',
          description:
            'Sistemas listos para producción en semanas, no meses. Acceso directo, sin intermediarios.',
        },
        realUse: {
          title: 'Construido para Uso Real',
          description:
            'Código limpio, pruebas adecuadas y documentación. Sin atajos ni prototipos.',
        },
        personal: {
          title: 'Personal y Directo',
          description:
            'Un desarrollador experimentado. Más de 25 años de experiencia empresarial. Trabajas directamente conmigo.',
        },
      },
    },

    hero: {
      title: 'Planificador de Ingresos',
      subtitle:
        'Planifica tus ingresos como un profesional. Ajusta tu tarifa, horas e impuestos para ver lo que puedes ganar realmente al año.',
      note: 'Construido por Robert Cushman para freelancers, consultores y fundadores independientes que quieren claridad sobre sus números.',
    },

    viewToggle: {
      snapshot: 'Vista Rápida',
      forecast: 'Pronóstico',
    },

    inputs: {
      title: 'Tus Datos',
      hourlyRate: 'Tarifa por Hora',
      hoursPerWeek: 'Horas Facturables por Semana',
      vacationWeeks: 'Semanas de Vacaciones al Año',
      taxRate: 'Tasa de Impuestos (%)',
      targetAnnualNet: 'Ingreso Anual Neto Objetivo',
      targetOptional: '(opcional)',
      targetPlaceholder: 'Dejar en blanco para calcular de los datos',
      currency: 'Moneda',
      language: 'Idioma',
      rangeLabel: 'Rango',
    },

    summary: {
      title: 'Tus Ingresos',
      perDay: 'Por Día',
      perWeek: 'Por Semana',
      perMonth: 'Por Mes',
      perYear: 'Por Año',
      gross: 'Bruto',
      net: 'Neto',
      netAfterTax: 'Neto (después de impuestos)',
      whatIf: '¿Qué pasaría si:',
      whatIfText:
        'Si aumentaras tu tarifa por hora en 10%, ganarías',
    },

    scenarios: {
      title: 'Constructor de Escenarios',
      pessimistic: 'Pesimista',
      pessimisticDesc: 'Estimación conservadora',
      realistic: 'Realista',
      realisticDesc: 'Resultado más probable',
      optimistic: 'Optimista',
      optimisticDesc: 'Meta ambiciosa',
      sharedTaxRate: 'Tasa de Impuestos (compartida en todos los escenarios)',
    },

    range: {
      title: 'Rango de Ingresos Anuales',
      incomeSpread: 'Diferencia de Ingresos',
      range: 'Rango',
    },

    chart: {
      title: 'Proyección Mensual de Ingresos',
      steady: 'Estable',
      q4Heavy: 'Q4 Alto',
      summerSlow: 'Verano Lento',
      steadyDesc:
        'Estable: Ingresos consistentes durante todo el año sin variación estacional.',
      q4HeavyDesc:
        'Q4 Alto: Mayores ingresos en Q4 (Oct-Dic) debido a proyectos de fin de año y gasto presupuestario. Común para consultores y servicios B2B.',
      summerSlowDesc:
        'Verano Lento: Ingresos reducidos en meses de verano (Jun-Ago) cuando los clientes toman vacaciones. Común para muchos negocios de servicios.',
    },

    insights: {
      title: 'Perspectivas Clave',
      realisticIncome: 'Tu ingreso anual realista:',
      incomeRange: 'Rango de ingresos:',
      capacityWarning:
        'El escenario optimista requiere {hours} hrs/semana - cerca de la capacidad máxima. Considera aumentar las tarifas en su lugar.',
      pessimisticFloor:
        'Incluso en el caso pesimista, ganas {amount} - ese es tu piso de ingresos.',
      rateIncrease:
        'Un aumento de tarifa del 10% agregaría {amount} a tu ingreso anual.',
      spread: 'diferencia',
    },

    toast: {
      currencyChanged: 'Moneda establecida en',
      languageChanged: 'Language set to English',
      languageChangedEs: 'Idioma cambiado a español',
    },

    chartPlaceholder: {
      title: 'Gráfico de Ingresos',
      comingSoon: 'Visualización de gráfico próximamente',
    },

    common: {
      loading: 'Cargando...',
      error: 'Error',
      reset: 'Restablecer',
    },
  },
}

export function useTranslation(language: Language): Translations {
  return translations[language]
}
