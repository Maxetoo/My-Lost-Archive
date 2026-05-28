import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BlogCard from './BlogCard'
import AudioCard from './AudioCard'
import { usePosts } from '../../contexts/PostsContext'

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="8" aria-hidden="true">
    <path d="M1 1l5 5 5-5" />
  </svg>
)

const BlogFeed = () => {
  const navigate = useNavigate()
  const posts = usePosts()
  const [query, setQuery] = useState('')

  const visible = posts.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Page>
      <Container>
        <PageHeader>
          <PageTitle>Blog</PageTitle>

          <SearchBar>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search articles and podcasts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </SearchBar>

          <FilterRow>
            <FilterBtn>
              Newest <ChevronIcon />
            </FilterBtn>
          </FilterRow>
        </PageHeader>

        <List>
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
  margin-bottom: 0.75rem;
`

const FilterBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.65;
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
