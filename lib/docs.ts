import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface DocMetadata {
  title: string
  description?: string
  order?: number
  category?: string
}

export interface DocFile {
  slug: string
  title: string
  description?: string
  order: number
  category: string
  content: string
  metadata: DocMetadata
}

const docsDirectory = path.join(process.cwd(), 'docs')
const rootDocsFiles = ['README.md']

/**
 * Get all available documentation files
 */
export function getAllDocs(): DocFile[] {
  const docs: DocFile[] = []

  // Get root-level docs (README, PRD)
  rootDocsFiles.forEach((filename) => {
    const fullPath = path.join(process.cwd(), filename)
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const slug = filename.replace(/\.md$/, '').toLowerCase()
      docs.push({
        slug,
        title:
          data.title ||
          extractTitleFromContent(content) ||
          formatSlugToTitle(slug),
        description: data.description,
        order: data.order ?? (slug === 'readme' ? 0 : 1),
        category: 'Overview',
        content,
        metadata: data as DocMetadata,
      })
    }
  })

  // Get docs from /docs directory
  if (fs.existsSync(docsDirectory)) {
    const filenames = fs.readdirSync(docsDirectory)

    filenames.forEach((filename) => {
      if (filename.endsWith('.md')) {
        const fullPath = path.join(docsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const slug = filename.replace(/\.md$/, '').toLowerCase()
        docs.push({
          slug,
          title:
            data.title ||
            extractTitleFromContent(content) ||
            formatSlugToTitle(slug),
          description: data.description,
          order: data.order ?? 99,
          category: data.category || 'Documentation',
          content,
          metadata: data as DocMetadata,
        })
      }
    })
  }

  // Sort by order, then by title
  return docs.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })
}

/**
 * Get a single doc by slug
 */
export function getDocBySlug(slug: string): DocFile | null {
  const allDocs = getAllDocs()
  return allDocs.find((doc) => doc.slug === slug) || null
}

/**
 * Extract title from first H1 in markdown content
 */
function extractTitleFromContent(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

/**
 * Format slug to readable title
 */
function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Group docs by category
 */
export function getDocsByCategory(): Record<string, DocFile[]> {
  const allDocs = getAllDocs()
  const grouped: Record<string, DocFile[]> = {}

  allDocs.forEach((doc) => {
    if (!grouped[doc.category]) {
      grouped[doc.category] = []
    }
    grouped[doc.category].push(doc)
  })

  return grouped
}
