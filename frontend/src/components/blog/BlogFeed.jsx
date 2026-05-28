import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BlogCard from './BlogCard'
import AudioCard from './AudioCard'
import { usePosts, usePostsLoading } from '../../contexts/PostsContext'
import BlogCardSkeleton from './BlogCardSkeleton'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)


const SKELETON_COUNT = 5

const BlogFeed = () => {
  const navigate = useNavigate()
  const posts = usePosts()
  const loading = usePostsLoading()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))]

  const visible = posts.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesQuery && matchesCategory
  })

  return (
    <Page>
      <Container>
        <PageHeader>
          <PageTitle>Explore my mind</PageTitle>

          <SearchBar>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search through my archives…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </SearchBar>

          <FilterRow>
            {categories.map((cat) => (
              <FilterBtn
                key={cat}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </FilterBtn>
            ))}
          </FilterRow>
        </PageHeader>

        <List>
          {loading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i}>
                <BlogCardSkeleton />
                {i < SKELETON_COUNT - 1 && <Divider />}
              </div>
            ))
          ) : (
            <>
              {visible.length === 0 && (
                <Empty>No results for "{query}"</Empty>
              )}
              {visible.map((item, idx) => (
                <div key={item.id}>
                  {item.type === 'article' ? (
                    <BlogCard
                      post={item}
                      onClick={() => navigate(`/blog/${item.id}`)}
                    />
                  ) : (
                    <AudioCard item={item} />
                  )}
                  {idx < visible.length - 1 && <Divider />}
                </div>
              ))}
            </>
          )}
        </List>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  padding: 3rem 0 6rem;

  @media (max-width: 640px) {
    padding: 2rem 0 4rem;
  }
`

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const PageHeader = styled.div`
  margin-bottom: 0.5rem;
`

const PageTitle = styled.h1`
  font-family: 'Libre Caslon Text', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.75rem;

  @media (max-width: 640px) {
    font-size: 1.7rem;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.9rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--neutral-color);
    background: none;

    &::placeholder {
      color: var(--secondary-color);
    }
  }
`

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const FilterBtn = styled.button`
  background: ${({ $active }) => ($active ? 'var(--primary-color)' : 'none')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary-color)' : 'var(--border-color)')};
  border-radius: 50px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  color: ${({ $active }) => ($active ? '#fff' : 'var(--neutral-color)')};
  padding: 0.3rem 0.9rem;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: var(--primary-color);
    color: ${({ $active }) => ($active ? '#fff' : 'var(--primary-color)')};
  }
`

const List = styled.div`
  margin-top: 0.5rem;
`

const Divider = styled.div`
  height: 1px;
  background: var(--divider-color);
`

const Empty = styled.p`
  padding: 3rem 0;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
`

export default BlogFeed
