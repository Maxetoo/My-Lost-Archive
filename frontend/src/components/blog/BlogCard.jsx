import styled, { css } from 'styled-components'

const BlogCard = ({ post, onClick, $grid }) => (
  <Card
    onClick={onClick}
    $grid={$grid}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <Category>{post.category}</Category>
    <Title>{post.title}</Title>
    <Excerpt>{post.excerpt}</Excerpt>
  </Card>
)

const Card = styled.article`
  padding: 1.75rem 0;
  cursor: pointer;
  outline: none;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.82;
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 4px;
    border-radius: 4px;
  }

  ${({ $grid }) =>
    $grid &&
    css`
      padding: 1.5rem 0;

      @media (max-width: 640px) {
        border-bottom: 1px solid var(--divider-color);
      }
    `}
`

const Category = styled.span`
  display: block;
  font-size: 0.72rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`

const Title = styled.h2`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-dark);
  margin-bottom: 0.65rem;
`

const Excerpt = styled.p`
  font-size: 0.875rem;
  line-height: 1.72;
  color: var(--text-muted);
  margin-bottom: 1.1rem;
  font-family: 'DM Sans', sans-serif;
`

export default BlogCard
