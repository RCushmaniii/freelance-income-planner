import { getAllDocs, getDocBySlug } from '@/lib/docs'
import { notFound } from 'next/navigation'
import DocViewer from './DocViewer'

export async function generateStaticParams() {
  const docs = getAllDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug)
  
  if (!doc) {
    return {
      title: 'Documentation Not Found',
    }
  }

  return {
    title: `${doc.title} | CushLabs Docs`,
    description: doc.description || `Documentation for ${doc.title}`,
  }
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug)

  if (!doc) {
    notFound()
  }

  return (
    <DocViewer
      slug={params.slug}
      content={doc.content}
      title={doc.title}
      category={doc.category}
      description={doc.description}
    />
  )
}
