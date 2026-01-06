"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Menu, X, ArrowLeft } from "lucide-react";

// Documentation navigation structure - slugs must match lowercase filenames
const DOCS_NAV = [
  { title: "Documentation Index", slug: "index" },
  { title: "Design", slug: "design" },
  { title: "Lessons Learned", slug: "lessons_learned" },
  { title: "Portfolio Template", slug: "portfolio_template" },
  { title: "AI Engineering Rules", slug: "ai_engineering_rules" },
  { title: "AI Startup", slug: "ai_startup" },
  { title: "Working with Humans", slug: "skill-working-with-humans" },
  { title: "Pre-Deploy Audit", slug: "predeploy_audit" },
  { title: "Getting Started", slug: "readme" },
];

interface DocViewerProps {
  slug: string;
  content: string;
  title: string;
  category?: string;
  description?: string;
}

export default function DocViewer({ slug, content, title, category, description }: DocViewerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentDoc = DOCS_NAV.find((doc) => doc.slug === slug);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Mobile Header - Hidden on desktop (docs: breakpoint) */}
      <div className="docs:hidden border-b border-muted-strong/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:text-accent transition-colors">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="font-heading text-xl font-bold">Documentation</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-muted-strong/30 hover:border-accent/50 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile, fixed on desktop */}
        <aside className="hidden docs:block w-64 min-h-screen bg-muted/5 border-r border-muted/20 fixed left-0 top-0 overflow-y-auto">
          <div className="p-6">
            <Link
              href="/"
              className="text-muted hover:text-accent text-sm mb-6 block transition-colors"
            >
              ← Back to Site
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              <h2 className="text-lg font-semibold text-foreground font-heading">
                Documentation
              </h2>
            </div>
            <nav className="space-y-1">
              {DOCS_NAV.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className={`block px-3 py-2 rounded text-sm transition-colors ${
                    doc.slug === slug
                      ? "bg-accent/10 text-foreground font-medium"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  }`}
                >
                  {doc.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar - Slide-in panel matching main app */}
        {mobileMenuOpen && (
          <div className="docs:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            />

            <div
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-background border-l border-muted-strong/20 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-muted-strong/20">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="font-heading text-lg font-bold">Documentation</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-muted-strong/30 hover:border-accent/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <nav className="flex flex-col gap-1">
                  {DOCS_NAV.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        doc.slug === slug
                          ? "bg-accent/10 text-foreground"
                          : "hover:bg-muted-strong/10"
                      }`}
                    >
                      {doc.title}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-muted-strong/20">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Site</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Offset by sidebar width on desktop */}
        <main className="w-full docs:ml-64 flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12">
          <div className="max-w-4xl mx-auto overflow-hidden">
            {/* Markdown Content with Prose Styling */}
            <article className="prose dark:prose-invert max-w-none break-words overflow-hidden
                prose-headings:text-foreground prose-headings:font-semibold prose-headings:font-heading
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:font-body
                prose-a:text-accent prose-a:underline prose-a:decoration-accent/30
                hover:prose-a:decoration-accent
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-foreground/80 prose-em:italic
                prose-code:text-foreground/90 prose-code:bg-muted/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted/10 prose-pre:border prose-pre:border-muted/20 prose-pre:rounded-lg
                prose-ul:list-disc prose-ul:text-foreground/90 prose-ul:ml-6
                prose-ol:list-decimal prose-ol:text-foreground/90 prose-ol:ml-6
                prose-li:text-foreground/90 prose-li:leading-relaxed
                prose-blockquote:border-l-accent/30 prose-blockquote:text-foreground/80 prose-blockquote:italic
                prose-hr:border-muted/30
                prose-table:border-collapse prose-table:border prose-table:border-muted/20
                prose-th:bg-muted/10 prose-th:border prose-th:border-muted/20 prose-th:px-4 prose-th:py-2
                prose-td:border prose-td:border-muted/20 prose-td:px-4 prose-td:py-2
                prose-img:rounded-lg prose-img:shadow-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
