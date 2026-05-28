import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import BlogCard from './BlogCard'
import { usePosts } from '../../contexts/PostsContext'

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M19 12H5" />
    <path d="M12 5l-7 7 7 7" />
  </svg>
)

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const posts = usePosts()

  const post = posts.find((p) => p.id === id)
  const related = posts.filter((p) => p.id !== id)

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
            Back to Blog
          </BackBtn>
          <ShareBtn onClick={handleShare} aria-label="Share post">
            <ShareIcon />
          </ShareBtn>
        </TopRow>

        <Hero>
          <HeroImg src={post.image} alt={post.title} />
          <HeroOverlay>
            <HeroText>{post.heroText}</HeroText>
          </HeroOverlay>
        </Hero>

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

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem 1.75rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.62) 0%,
    rgba(0, 0, 0, 0.18) 50%,
    transparent 100%
  );
`

const HeroText = styled.h2`
  font-family: 'Libre Caslon Text', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 0.95;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.9rem;
`

const ShareBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: var(--text-dark);
  }
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
