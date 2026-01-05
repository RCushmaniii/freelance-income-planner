export type Language = 'en' | 'es'

export interface Translations {
  // Navigation & Header
  header: {
    title: string
    home: string
    incomePlanner: string
    about: string
    openMenu: string
    closeMenu: string
    theme: string
  }

  footer: {
    docs: string
    incomePlanner: string
    about: string
    github: string
    prd: string
    predeployAudit: string
    copyright: string
  }

  about: {
    title: string
    subtitle: string
    cards: {
      missionTitle: string
      missionBody: string
      audienceTitle: string
      audienceBody: string
      privacyTitle: string
      privacyBody: string
      strategyTitle: string
      strategyBody: string
    }
    underTheHoodTitle: string
    underTheHood: {
      frameworkLabel: string
      frameworkValue: string
      stateLabel: string
      stateValue: string
      chartingLabel: string
      chartingValue: string
      designLabel: string
      designValue: string
      i18nLabel: string
      i18nValue: string
    }
    builderNoteTitle: string
    builderNoteBody: string
    builderNoteSignature: string
    versionHistoryTitle: string
    versionHistory: {
      v10: string
      v11: string
    }
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
    unbillableHoursPerWeek: string
    vacationWeeks: string
    monthlyBusinessExpenses: string
    monthlyPersonalNeed: string
    currentSavings: string
    taxRate: string
    taxMode: string
    taxModeSimple: string
    taxModeSmart: string
    taxModeHelp: string
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
    realityTitle: string
    effectiveHourlyRate: string
    unbillableTime: string
    runway: string
    runwaySustainable: string
    runwayNotSet: string
    goalAheadBy: string
    goalBehindBy: string
    goalRequiredRate: string
    perDay: string
    perWeek: string
    perMonth: string
    perYear: string
    gross: string
    net: string
    netAfterTax: string
    whatIf: string
    whatIfText: string
    whatIfSuffix: string
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
    runwayTitle: string
    runwayNotSet: string
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
    fxFetchError: string
    languageChanged: string
    languageChangedEs: string
  }

  errors: {
    unableToCalculateIncome: string
    unableToCalculateRange: string
    unableToGenerateChartData: string
  }

  chartLegend: {
    pessimistic: string
    realistic: string
    optimistic: string
    rangeBand: string
    target: string
  }

  caseStudy: {
    title: string
    builtBy: string
    sections: {
      problem: {
        title: string
        body: string
      }
      design: {
        title: string
        body: string
      }
      stack: {
        title: string
        body: string
      }
      privacy: {
        title: string
        body: string
      }
    }
  }

  // Chart Placeholder
  chartPlaceholder: {
    title: string
    comingSoon: string
  }

  rateBenchmark: {
    title: string
    subtitle: string
    monthlyRangesTitle: string
    you: string
    youMarker: string
    perMonthNet: string
    compareToLabel: string
    compareToOptions: {
      local: string
      us: string
    }
    riskPremiumLabel: string
    riskPremiumHelp: string
    targetSliderLabel: string
    targetSliderHelp: string
    yourHourlyRate: string
    positionBelow: string
    positionAbove: string
    positionPercentile: string
    disclaimer: string
    tutoringTitle: string
    tutoringPrivateLessons: string
    tutoringNote: string
    fxUnavailable: string
    perHour: string
    factorsTitle: string
    factors: {
      experience: string
      schoolType: string
      hours: string
    }
    institutions: {
      international: string
      universities: string
      private: string
      public: string
      language: string
      usJunior: string
      usMid: string
      usSenior: string
    }
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
      home: 'Home',
      incomePlanner: 'Income Planner',
      about: 'About',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      theme: 'Theme',
    },

    footer: {
      docs: 'Docs',
      incomePlanner: 'Income Planner',
      about: 'About',
      github: 'GitHub',
      prd: 'PRD',
      predeployAudit: 'Predeploy Audit',
      copyright: '© {year} CushLabs.ai. All rights reserved.',
    },

    about: {
      title: 'About the Planner',
      subtitle:
        'A financial compass for the gig economy. Plan with clarity, not guesswork.',
      cards: {
        missionTitle: 'Stop Guessing Your Income',
        missionBody:
          "Freelancing is volatile. This tool bridges the gap between your hourly rate and your annual reality, translating 'billable hours' into the only number that matters: your take-home pay.",
        audienceTitle: 'Built for the Modern Independent',
        audienceBody:
          'Designed for English coaches, solo founders, and consultants who wear the CFO hat. Whether you bill $50/hr or $500/hr, clarity is your best asset.',
        privacyTitle: '100% Private. Client-Side Secure.',
        privacyBody:
          'Financial data is sensitive. That is why this app runs entirely in your browser. No databases, no tracking, and no accounts. Your data lives and dies on your device.',
        strategyTitle: 'The Strategic Advantage',
        strategyBody:
          'Use Snapshot for quick checks. Use Forecast to stress-test your year against pessimistic and optimistic conditions and find your real financial edge.',
      },
      underTheHoodTitle: 'Under the Hood',
      underTheHood: {
        frameworkLabel: 'Framework',
        frameworkValue: 'Next.js (App Router) + React + TypeScript',
        stateLabel: 'State',
        stateValue: 'Zustand persistence (localStorage)',
        chartingLabel: 'Charting',
        chartingValue: 'Recharts (interactive projections)',
        designLabel: 'Design',
        designValue: 'Tailwind CSS + CSS variable theming',
        i18nLabel: 'Language',
        i18nValue: 'Bilingual EN/ES via translation keys',
      },
      builderNoteTitle: 'From the Builder',
      builderNoteBody:
        'I built this because I am a freelancer too. I was tired of guessing if I could afford a vacation or if my rate was high enough to cover taxes. I hope this gives you the same peace of mind it gave me.',
      builderNoteSignature: '— Robert Cushman, Product Engineer',
      versionHistoryTitle: 'Version History',
      versionHistory: {
        v10: 'v1.0 — Initial launch',
        v11: 'v1.1 — Smarter benchmarks + progressive tax mode',
      },
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
      unbillableHoursPerWeek: 'Unbillable Hours per Week',
      vacationWeeks: 'Vacation Weeks per Year',
      monthlyBusinessExpenses: 'Monthly Business Expenses',
      monthlyPersonalNeed: 'Monthly Personal Need',
      currentSavings: 'Current Savings',
      taxRate: 'Tax Rate (%)',
      taxMode: 'Tax mode',
      taxModeSimple: 'Simple',
      taxModeSmart: 'Smart',
      taxModeHelp:
        'Uses a simple progressive tax curve (approx.) so higher incomes pay a higher effective rate.',
      targetAnnualNet: 'Target Annual Net Income',
      targetOptional: '(optional)',
      targetPlaceholder: 'Leave blank to calculate from inputs',
      currency: 'Currency',
      language: 'Language',
      rangeLabel: 'Range',
    },

    summary: {
      title: 'Your Income',
      realityTitle: 'Reality Check',
      effectiveHourlyRate: 'Effective hourly rate',
      unbillableTime: 'Unbillable time',
      runway: 'Runway',
      runwaySustainable: 'Sustainable',
      runwayNotSet: 'Add monthly personal need and savings to see runway.',
      goalAheadBy: 'Ahead of target by',
      goalBehindBy: 'Behind target by',
      goalRequiredRate: 'Est. required rate:',
      perDay: 'Per Day',
      perWeek: 'Per Week',
      perMonth: 'Per Month',
      perYear: 'Per Year',
      gross: 'Gross',
      net: 'Net',
      netAfterTax: 'Net (after tax + expenses)',
      whatIf: 'What if:',
      whatIfText: 'If you increased your hourly rate by 10%, you would earn',
      whatIfSuffix: 'per year.',
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
      incomeSpread: 'Potential Multiplier',
      range: 'Total Variance',
    },

    chart: {
      title: 'Monthly Income Projection',
      runwayTitle: 'Runway Projection (Savings Balance)',
      runwayNotSet:
        'Add monthly personal need + current savings to see your runway over time.',
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
      spread: 'potential upside',
    },

    toast: {
      currencyChanged: 'Currency set to',
      fxFetchError: 'Unable to fetch exchange rate. Showing formatting only.',
      languageChanged: 'Language set to English',
      languageChangedEs: 'Language set to Spanish',
    },

    errors: {
      unableToCalculateIncome:
        'Unable to calculate income. Please check your inputs.',
      unableToCalculateRange:
        'Unable to calculate income range. Please check your inputs.',
      unableToGenerateChartData:
        'Unable to generate chart data. Please check your inputs.',
    },

    chartLegend: {
      pessimistic: 'Pessimistic',
      realistic: 'Realistic',
      optimistic: 'Optimistic',
      rangeBand: 'Range',
      target: 'Target',
    },

    caseStudy: {
      title: 'Built & Designed',
      builtBy:
        'Built by Robert Cushman (CushLabs.ai) as a real-use planning tool and flagship portfolio project.',
      sections: {
        problem: {
          title: 'Problem',
          body: 'Freelancers and consultants often know their hourly rate, but not what that becomes after taxes, time off, and realistic weekly capacity. This tool turns inputs into clear income outcomes and scenarios.',
        },
        design: {
          title: 'Design choices',
          body: 'Fast, keyboard-friendly inputs, instant feedback, and a forecasting mode that compares downside, baseline, and upside. Charts are designed to communicate range + trend (not just raw numbers).',
        },
        stack: {
          title: 'Stack',
          body: 'Next.js (App Router), TypeScript, Tailwind CSS, Zustand persistence, Recharts, and an EN/ES translation layer.',
        },
        privacy: {
          title: 'Privacy',
          body: 'Inputs are stored locally in your browser for convenience. No accounts required and no personal data is sent anywhere by default.',
        },
      },
    },

    chartPlaceholder: {
      title: 'Income Chart',
      comingSoon: 'Chart visualization coming soon',
    },

    rateBenchmark: {
      title: 'Market Positioning',
      subtitle: 'Compare your estimated monthly net to example market ranges.',
      monthlyRangesTitle: 'Salary ranges by institution type',
      you: 'You:',
      youMarker: 'Your estimated monthly net',
      perMonthNet: 'net/month',
      compareToLabel: 'Compare to',
      compareToOptions: {
        local: 'Local salaries',
        us: 'US-based consultants',
      },
      riskPremiumLabel: 'Risk premium',
      riskPremiumHelp: '(adds ~30% to salaried ranges)',
      targetSliderLabel: 'Target hourly rate',
      targetSliderHelp:
        'Slide to see how your market position changes without overwriting your saved inputs.',
      yourHourlyRate: 'Hourly rate:',
      positionBelow: 'Below the displayed range',
      positionAbove: '{multiple}× above the top of the range',
      positionPercentile:
        'Around the {percentile}th percentile within the displayed range',
      disclaimer:
        'These are example estimates for UX testing only. In a future version, this panel can be powered by live research and citations.',
      tutoringTitle: 'Private tutoring',
      tutoringPrivateLessons: 'Private lessons often range around',
      tutoringNote:
        'Hourly tutoring can materially change monthly totals when combined with a school role.',
      fxUnavailable: 'FX unavailable — showing MXN values only.',
      perHour: 'per hour',
      factorsTitle: 'Factors that move the number',
      factors: {
        experience:
          'Experience & certifications (TEFL/CELTA/TESOL) can raise pay significantly.',
        schoolType:
          'International schools and universities tend to pay more than language centers.',
        hours:
          'Teaching hours and private lessons can increase monthly income.',
      },
      institutions: {
        international: 'International Schools',
        universities: 'Universities',
        private: 'Private Schools',
        public: 'Public/Government Schools',
        language: 'Private Language Schools',
        usJunior: 'US Junior Consultant',
        usMid: 'US Mid-Level Consultant',
        usSenior: 'US Senior Consultant',
      },
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
      home: 'Inicio',
      incomePlanner: 'Planificador de Ingresos',
      about: 'Acerca de',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      theme: 'Tema',
    },

    footer: {
      docs: 'Documentación',
      incomePlanner: 'Planificador',
      about: 'Acerca de',
      github: 'GitHub',
      prd: 'PRD',
      predeployAudit: 'Auditoría Predeploy',
      copyright: '© {year} CushLabs.ai. Todos los derechos reservados.',
    },

    about: {
      title: 'Acerca del Planificador',
      subtitle:
        'Una brújula financiera para la economía independiente. Planea con claridad, no con suposiciones.',
      cards: {
        missionTitle: 'Deja de Adivinar tus Ingresos',
        missionBody:
          'El trabajo independiente es volátil. Esta herramienta conecta tu tarifa por hora con tu realidad anual y convierte “horas facturables” en lo único que importa: tu ingreso neto real.',
        audienceTitle: 'Hecho para el Independiente Moderno',
        audienceBody:
          'Diseñado para coaches de inglés, fundadores independientes y consultores que también deben pensar como CFO. Cobres $50/h o $500/h, la claridad es tu mejor activo.',
        privacyTitle: '100% Privado. Seguro del Lado del Cliente.',
        privacyBody:
          'Los datos financieros son sensibles. Por eso esta app corre completamente en tu navegador: sin bases de datos, sin tracking y sin cuentas. Tus datos viven y mueren en tu dispositivo.',
        strategyTitle: 'La Ventaja Estratégica',
        strategyBody:
          'Usa Vista Rápida para validaciones rápidas. Usa Pronóstico para poner a prueba tu año contra condiciones pesimistas y optimistas y encontrar tu verdadera ventaja financiera.',
      },
      underTheHoodTitle: 'Bajo el Cofre',
      underTheHood: {
        frameworkLabel: 'Framework',
        frameworkValue: 'Next.js (App Router) + React + TypeScript',
        stateLabel: 'Estado',
        stateValue: 'Persistencia con Zustand (localStorage)',
        chartingLabel: 'Gráficas',
        chartingValue: 'Recharts (proyecciones interactivas)',
        designLabel: 'Diseño',
        designValue: 'Tailwind CSS + temas con variables CSS',
        i18nLabel: 'Idioma',
        i18nValue: 'Bilingüe EN/ES con llaves de traducción',
      },
      builderNoteTitle: 'Del Creador',
      builderNoteBody:
        'Construí esto porque yo también soy freelancer. Me cansé de adivinar si podía pagarme vacaciones o si mi tarifa era suficiente para cubrir impuestos. Ojalá te dé la misma tranquilidad que me dio a mí.',
      builderNoteSignature: '— Robert Cushman, Product Engineer',
      versionHistoryTitle: 'Historial de Versiones',
      versionHistory: {
        v10: 'v1.0 — Lanzamiento inicial',
        v11: 'v1.1 — Benchmarks más inteligentes + modo de impuestos progresivo',
      },
    },

    home: {
      tagline: 'CUSHLABS.AI',
      headline: 'Integración de IA y Desarrollo de Software Moderno para PyMEs',
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
      unbillableHoursPerWeek: 'Horas No Facturables por Semana',
      vacationWeeks: 'Semanas de Vacaciones al Año',
      monthlyBusinessExpenses: 'Gastos Mensuales del Negocio',
      monthlyPersonalNeed: 'Necesidad Mensual Personal',
      currentSavings: 'Ahorros Actuales',
      taxRate: 'Tasa de Impuestos (%)',
      taxMode: 'Modo de impuestos',
      taxModeSimple: 'Simple',
      taxModeSmart: 'Inteligente',
      taxModeHelp:
        'Usa una curva progresiva simple (aprox.) para que ingresos más altos paguen una tasa efectiva mayor.',
      targetAnnualNet: 'Ingreso Anual Neto Objetivo',
      targetOptional: '(opcional)',
      targetPlaceholder: 'Dejar en blanco para calcular de los datos',
      currency: 'Moneda',
      language: 'Idioma',
      rangeLabel: 'Rango',
    },

    summary: {
      title: 'Tus Ingresos',
      realityTitle: 'Chequeo de Realidad',
      effectiveHourlyRate: 'Tarifa efectiva por hora',
      unbillableTime: 'Tiempo no facturable',
      runway: 'Runway',
      runwaySustainable: 'Sostenible',
      runwayNotSet:
        'Agrega necesidad mensual personal y ahorros para ver el runway.',
      goalAheadBy: 'Por encima del objetivo por',
      goalBehindBy: 'Por debajo del objetivo por',
      goalRequiredRate: 'Tarifa estimada requerida:',
      perDay: 'Por Día',
      perWeek: 'Por Semana',
      perMonth: 'Por Mes',
      perYear: 'Por Año',
      gross: 'Bruto',
      net: 'Neto',
      netAfterTax: 'Neto (después de impuestos + gastos)',
      whatIf: '¿Qué pasaría si:',
      whatIfText: 'Si aumentaras tu tarifa por hora en 10%, ganarías',
      whatIfSuffix: 'al año.',
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
      incomeSpread: 'Multiplicador Potencial',
      range: 'Varianza Total',
    },

    chart: {
      title: 'Proyección Mensual de Ingresos',
      runwayTitle: 'Proyección de Runway (Saldo de Ahorros)',
      runwayNotSet:
        'Agrega necesidad mensual personal + ahorros actuales para ver tu runway con el tiempo.',
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
      spread: 'potencial al alza',
    },

    toast: {
      currencyChanged: 'Moneda establecida en',
      fxFetchError:
        'No se pudo obtener el tipo de cambio. Solo se mostrará el formato.',
      languageChanged: 'Idioma cambiado a inglés',
      languageChangedEs: 'Idioma cambiado a español',
    },

    errors: {
      unableToCalculateIncome:
        'No se pudo calcular el ingreso. Por favor revisa tus datos.',
      unableToCalculateRange:
        'No se pudo calcular el rango de ingresos. Por favor revisa tus datos.',
      unableToGenerateChartData:
        'No se pudieron generar los datos del gráfico. Por favor revisa tus datos.',
    },

    chartLegend: {
      pessimistic: 'Pesimista',
      realistic: 'Realista',
      optimistic: 'Optimista',
      rangeBand: 'Rango',
      target: 'Objetivo',
    },

    caseStudy: {
      title: 'Construido y Diseñado',
      builtBy:
        'Construido por Robert Cushman (CushLabs.ai) como una herramienta de planeación para uso real y proyecto principal de portafolio.',
      sections: {
        problem: {
          title: 'Problema',
          body: 'Freelancers y consultores suelen conocer su tarifa por hora, pero no cómo se traduce después de impuestos, vacaciones y una capacidad semanal realista. Esta herramienta convierte tus datos en resultados claros y escenarios.',
        },
        design: {
          title: 'Decisiones de diseño',
          body: 'Datos rápidos y amigables para teclado, retroalimentación instantánea y un modo de pronóstico que compara el peor caso, el caso base y el mejor caso. Los gráficos están pensados para comunicar rango + tendencia.',
        },
        stack: {
          title: 'Tecnología',
          body: 'Next.js (App Router), TypeScript, Tailwind CSS, persistencia con Zustand, Recharts y un sistema de traducción EN/ES.',
        },
        privacy: {
          title: 'Privacidad',
          body: 'Tus datos se guardan localmente en tu navegador por conveniencia. No se requiere cuenta y por defecto no se envían datos personales a ningún lugar.',
        },
      },
    },

    chartPlaceholder: {
      title: 'Gráfico de Ingresos',
      comingSoon: 'Visualización de gráfico próximamente',
    },

    rateBenchmark: {
      title: 'Posicionamiento de Mercado',
      subtitle:
        'Compara tu neto mensual estimado con rangos de mercado de ejemplo.',
      monthlyRangesTitle: 'Rangos salariales por tipo de institución',
      you: 'Tú:',
      youMarker: 'Tu neto mensual estimado',
      perMonthNet: 'neto/mes',
      compareToLabel: 'Comparar con',
      compareToOptions: {
        local: 'Salarios locales',
        us: 'Consultores en EE. UU.',
      },
      riskPremiumLabel: 'Prima de riesgo',
      riskPremiumHelp: '(agrega ~30% a rangos asalariados)',
      targetSliderLabel: 'Tarifa objetivo por hora',
      targetSliderHelp:
        'Desliza para ver cómo cambia tu posición sin sobrescribir tus datos guardados.',
      yourHourlyRate: 'Tarifa por hora:',
      positionBelow: 'Por debajo del rango mostrado',
      positionAbove: '{multiple}× por encima del tope del rango',
      positionPercentile:
        'Aproximadamente en el percentil {percentile} dentro del rango mostrado',
      disclaimer:
        'Estas cifras son estimaciones de ejemplo solo para probar la interfaz. En una versión futura, este panel puede usar investigación en vivo con citas.',
      tutoringTitle: 'Clases particulares',
      tutoringPrivateLessons: 'Las clases privadas suelen estar alrededor de',
      tutoringNote:
        'Las clases por hora pueden cambiar mucho el total mensual si se combinan con una escuela.',
      fxUnavailable:
        'Tipo de cambio no disponible — mostrando solo valores en MXN.',
      perHour: 'por hora',
      factorsTitle: 'Factores que cambian el resultado',
      factors: {
        experience:
          'Experiencia y certificaciones (TEFL/CELTA/TESOL) pueden aumentar el pago.',
        schoolType:
          'Escuelas internacionales y universidades suelen pagar más que centros de idiomas.',
        hours:
          'Más horas y clases privadas pueden aumentar el ingreso mensual.',
      },
      institutions: {
        international: 'Escuelas Internacionales',
        universities: 'Universidades',
        private: 'Escuelas Privadas',
        public: 'Escuelas Públicas/Gobierno',
        language: 'Escuelas de Idiomas Privadas',
        usJunior: 'Consultor Junior (EE. UU.)',
        usMid: 'Consultor Intermedio (EE. UU.)',
        usSenior: 'Consultor Senior (EE. UU.)',
      },
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
