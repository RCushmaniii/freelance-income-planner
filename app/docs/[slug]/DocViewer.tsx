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
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile, fixed on desktop */}
        <aside className="hidden docs:block w-64 min-h-screen bg-muted/5 border-r border-muted/20 fixed left-0 top-[73px] overflow-y-auto">
          <div className="p-6">
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

        {/* Mobile Sidebar - Collapsible docs navigation for mobile */}
        <div className="docs:hidden w-full">
          <div className="border-b border-muted-strong/20 bg-muted/5">
            <button
              type="button"
              className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold hover:bg-muted/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span>Documentation Navigation</span>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            {mobileMenuOpen && (
              <nav className="px-4 pb-4 space-y-1">
                {DOCS_NAV.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      doc.slug === slug
                        ? "bg-accent/10 text-foreground font-medium"
                        : "text-muted hover:text-foreground hover:bg-muted/10"
                    }`}
                  >
                    {doc.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>

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
