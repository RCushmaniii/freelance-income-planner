'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useIncomePlannerStore } from '@/lib/store'
import { useTranslation } from '@/lib/i18n/translations'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type SectionKey = 'problem' | 'design' | 'stack' | 'privacy'

export default function CaseStudyPanel() {
  const { language } = useIncomePlannerStore()
  const t = useTranslation(language)

  const [open, setOpen] = useState<SectionKey | null>('problem')

  const sections: Array<{ key: SectionKey; title: string; body: string }> = [
    {
      key: 'problem',
      title: t.caseStudy.sections.problem.title,
      body: t.caseStudy.sections.problem.body,
    },
    {
      key: 'design',
      title: t.caseStudy.sections.design.title,
      body: t.caseStudy.sections.design.body,
    },
    {
      key: 'stack',
      title: t.caseStudy.sections.stack.title,
      body: t.caseStudy.sections.stack.body,
    },
    {
      key: 'privacy',
      title: t.caseStudy.sections.privacy.title,
      body: t.caseStudy.sections.privacy.body,
    },
  ]

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">{t.caseStudy.title}</h2>
        <p className="text-sm text-muted mt-2">{t.caseStudy.builtBy}</p>
      </div>

      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = open === section.key

          return (
            <div
              key={section.key}
              className="border border-muted-strong/20 rounded-lg overflow-hidden"
            >
              <Button
                type="button"
                onClick={() => setOpen(isOpen ? null : section.key)}
                variant="ghost"
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-accent/5 transition-colors h-auto rounded-none"
                aria-expanded={isOpen}
              >
                <span className="font-heading text-sm font-semibold">{section.title}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-strong transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              {isOpen && (
                <div className="px-4 pb-4 text-sm text-muted leading-relaxed">
                  {section.body}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
