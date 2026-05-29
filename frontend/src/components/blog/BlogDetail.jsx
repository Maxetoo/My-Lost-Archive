import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import BlogCard from './BlogCard'
import { usePosts, usePostsLoading } from '../../contexts/PostsContext'

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M19 12H5" />
    <path d="M12 5l-7 7 7 7" />
  </svg>
)


const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const setMeta = (property, content) => {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const removeMeta = (property) => {
  const el = document.querySelector(`meta[property="${property}"]`)
  if (el) el.remove()
}

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const posts = usePosts()
  const loading = usePostsLoading()

  const post = posts.find((p) => p.id === id)
  const related = posts.filter((p) => p.id !== id)

  useEffect(() => {
    if (!post) return

    document.title = post.title

    setMeta('og:title', post.title)
    setMeta('og:description', post.excerpt || '')
    setMeta('og:url', window.location.href)
    setMeta('og:type', 'article')
    if (post.image) setMeta('og:image', post.image)

    return () => {
      document.title = 'My Lost Archive'
      ;['og:title', 'og:description', 'og:url', 'og:type', 'og:image'].forEach(removeMeta)
    }
  }, [post])

  if (loading) return (
    <Page>
      <Container>
        <TopRow>
          <BackBtn onClick={() => navigate('/blog')}>
            <BackIcon />
            Back to Archive
          </BackBtn>
        </TopRow>
        <Skeleton $h="300px" $radius="20px" $mb="1.75rem" />
        <Skeleton $h="12px" $w="80px" $mb="0.9rem" />
        <Skeleton $h="28px" $w="75%" $mb="0.6rem" />
        <Skeleton $h="28px" $w="55%" $mb="1.25rem" />
        <Skeleton $h="12px" $w="100px" $mb="2rem" />
        <Skeleton $h="14px" $mb="0.75rem" />
        <Skeleton $h="14px" $mb="0.75rem" />
        <Skeleton $h="14px" $w="85%" $mb="0.75rem" />
        <Skeleton $h="14px" $mb="0.75rem" />
        <Skeleton $h="14px" $w="65%" $mb="0.75rem" />
      </Container>
    </Page>
  )

  if (!post) return null

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Page>
      <Container>
        <TopRow>
          <BackBtn onClick={() => navigate('/blog')}>
            <BackIcon />
            Back to Archive
          </BackBtn>
          <ShareBtn onClick={handleShare}>
            Share
            <ShareIcon />
          </ShareBtn>
        </TopRow>

        {post.image && (
          <Hero>
            <HeroImg src={post.image} alt={post.title} />
          </Hero>
        )}

        <PostMeta>
          <PostCategory>{post.category}</PostCategory>
          <PostReadTime>{post.readTime}</PostReadTime>
        </PostMeta>

        <PostTitle>{post.title}</PostTitle>

        <PostDate>{post.date}</PostDate>

        <Body>
          {post.content && documentToReactComponents(post.content, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => <BodyText>{children}</BodyText>,
              [BLOCKS.HEADING_1]: (node, children) => <BodyHeading as="h1">{children}</BodyHeading>,
              [BLOCKS.HEADING_2]: (node, children) => <BodyHeading as="h2">{children}</BodyHeading>,
              [BLOCKS.HEADING_3]: (node, children) => <BodyHeading as="h3">{children}</BodyHeading>,
              [BLOCKS.UL_LIST]: (node, children) => <BodyList>{children}</BodyList>,
              [BLOCKS.OL_LIST]: (node, children) => <BodyList as="ol">{children}</BodyList>,
              [BLOCKS.LIST_ITEM]: (node, children) => <BodyListItem>{children}</BodyListItem>,
            },
          })}
        </Body>

        {related.length > 0 && (
          <ContinueSection>
            <ContinueLabel>Continue Reading</ContinueLabel>
            {related.map((item) => (
              <BlogCard
                key={item.id}
                post={item}
                onClick={() => navigate(`/blog/${item.id}`)}
              />
            ))}
          </ContinueSection>
        )}
      </Container>
    </Page>
  )
}

const Page = styled.div`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  padding: 2.5rem 0 6rem;
`

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary-color);
  font-size: 0.88rem;
  font-family: 'DM Sans', sans-serif;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: var(--text-dark);
  }
`

const ShareBtn = styled.button`
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50px;
  cursor: pointer;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-family: 'DM Sans', sans-serif;
  padding: 0.45rem 0.85rem;
  transition: color 20ms ease, border-color 20ms ease;

  &:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff;
  }
`

const Hero = styled.div`
  border-radius: 20px;
  overflow: hidden;
  height: 300px;
  position: relative;
  background: var(--surface-color);
  margin-bottom: 1.75rem;

  @media (max-width: 640px) {
    height: 220px;
  }
`

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.9rem;
`

const PostCategory = styled.span`
  font-size: 0.72rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const PostReadTime = styled.span`
  font-size: 0.78rem;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
`

const PostTitle = styled.h1`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.28;
  color: var(--text-dark);
  margin-bottom: 1.25rem;

  @media (max-width: 640px) {
    font-size: 1.3rem;
  }
`

const PostDate = styled.p`
  font-size: 0.82rem;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 2rem;
`

const Body = styled.div`
  margin-bottom: 0.5rem;
`

const BodyText = styled.p`
  font-size: 0.975rem;
  line-height: 1.85;
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-family: 'DM Sans', sans-serif;
`

const BodyHeading = styled.h2`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 1.75rem 0 0.75rem;
  line-height: 1.3;
`

const BodyList = styled.ul`
  margin: 0 0 1rem 1.25rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.975rem;
  line-height: 1.85;
  color: var(--text-muted);
`

const BodyListItem = styled.li`
  margin-bottom: 0.4rem;

  p {
    margin: 0;
  }
`

const shimmer = keyframes`
  0% { background-position: -600px 0 }
  100% { background-position: 600px 0 }
`

const Skeleton = styled.div`
  height: ${({ $h }) => $h || '14px'};
  width: ${({ $w }) => $w || '100%'};
  border-radius: ${({ $radius }) => $radius || '6px'};
  margin-bottom: ${({ $mb }) => $mb || '0'};
  background: linear-gradient(
    90deg,
    var(--surface-color) 25%,
    var(--border-color) 50%,
    var(--surface-color) 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`

const ContinueSection = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--divider-color);
`

const ContinueLabel = styled.p`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
`

export default BlogDetail
