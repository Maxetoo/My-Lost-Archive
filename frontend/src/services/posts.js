import contentfulClient from '../configs/contentful.jsx'

const extractPlainText = (node) => {
  if (!node) return ''
  if (node.nodeType === 'text') return node.value || ''
  if (node.content) return node.content.map(extractPlainText).join(' ')
  return ''
}

const calcReadTime = (richText) => {
  const text = extractPlainText(richText)
  const words = text.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

const mapPost = (entry) => {
  const f = entry.fields
  return {
    id: entry.sys.id,
    type: 'article',
    category: f.category || '',
    title: f.title || '',
    excerpt: f.excerpt || '',
    content: f.content || null,
    heroText: f.title || '',
    image: f.coverImage?.fields?.file?.url
      ? `https:${f.coverImage.fields.file.url}`
      : '',
    date: f.date
      ? new Date(f.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    readTime: calcReadTime(f.content),
  }
}

export const fetchPosts = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: '-fields.date',
  })
  return res.items.map(mapPost)
}
