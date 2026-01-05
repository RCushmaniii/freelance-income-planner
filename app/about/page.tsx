'use client'

import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Code2, Compass, History, ShieldCheck, Target, Users } from 'lucide-react'

export default function AboutPage() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          {t.about.title}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          {t.about.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                {t.about.cards.missionTitle}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.about.cards.missionBody}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                {t.about.cards.audienceTitle}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.about.cards.audienceBody}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                {t.about.cards.privacyTitle}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.about.cards.privacyBody}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold">
                {t.about.cards.strategyTitle}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {t.about.cards.strategyBody}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-bold">{t.about.underTheHoodTitle}</h2>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-muted-strong/20 p-4">
              <dt className="text-xs font-semibold text-muted-strong">
                {t.about.underTheHood.frameworkLabel}
              </dt>
              <dd className="mt-1 text-foreground">{t.about.underTheHood.frameworkValue}</dd>
            </div>
            <div className="rounded-lg border border-muted-strong/20 p-4">
              <dt className="text-xs font-semibold text-muted-strong">{t.about.underTheHood.stateLabel}</dt>
              <dd className="mt-1 text-foreground">{t.about.underTheHood.stateValue}</dd>
            </div>
            <div className="rounded-lg border border-muted-strong/20 p-4">
              <dt className="text-xs font-semibold text-muted-strong">
                {t.about.underTheHood.chartingLabel}
              </dt>
              <dd className="mt-1 text-foreground">{t.about.underTheHood.chartingValue}</dd>
            </div>
            <div className="rounded-lg border border-muted-strong/20 p-4">
              <dt className="text-xs font-semibold text-muted-strong">{t.about.underTheHood.designLabel}</dt>
              <dd className="mt-1 text-foreground">{t.about.underTheHood.designValue}</dd>
            </div>
            <div className="rounded-lg border border-muted-strong/20 p-4 sm:col-span-2">
              <dt className="text-xs font-semibold text-muted-strong">{t.about.underTheHood.i18nLabel}</dt>
              <dd className="mt-1 text-foreground">{t.about.underTheHood.i18nValue}</dd>
            </div>
          </dl>
        </section>

        <aside className="bg-accent/5 border border-accent/20 rounded-xl p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold">{t.about.builderNoteTitle}</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">{t.about.builderNoteBody}</p>
          <p className="mt-4 text-xs font-semibold text-muted-strong">{t.about.builderNoteSignature}</p>
        </aside>
      </div>

      <div className="mt-10 bg-background border border-muted-strong/20 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-muted-strong/15 text-foreground flex items-center justify-center">
            <History className="h-5 w-5" />
          </div>
          <h2 className="font-heading text-xl font-bold">{t.about.versionHistoryTitle}</h2>
        </div>
        <ul className="text-sm text-muted space-y-2">
          <li>{t.about.versionHistory.v10}</li>
          <li>{t.about.versionHistory.v11}</li>
        </ul>
      </div>
    </div>
  )
}
