import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BlogCard from '../components/blog/BlogCard'
import { usePosts } from '../contexts/PostsContext'

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

const Home = () => {
  const navigate = useNavigate()
  const posts = usePosts()
  const [query, setQuery] = useState('')

  const articles = posts.filter((p) => p.type === 'article')
  const visible = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <> 
      <HeroSection>
        <HeroInner>
          <HeroLabel>
            <span>Intro</span>
            <HeroDash />
          </HeroLabel>
          <HeroHeading>My Lost Archive by Maxwell</HeroHeading>
        </HeroInner>

        <HeroBlob>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,112C672,128,768,192,864,229.3C960,267,1056,277,1152,245.3C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </HeroBlob>
      </HeroSection>

      <FeaturedSection>
        <FeaturedInner>
          <SectionHeading>Explore my mind</SectionHeading>

          <SearchBar>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search articles…"
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

          {visible.length === 0 ? (
            <Empty>No search result found</Empty>
          ) : (
            <>
              <FeaturedGrid>
                {visible.slice(0, 3).map((article) => (
                  <BlogCard
                    key={article.id}
                    post={article}
                    onClick={() => navigate(`/blog/${article.id}`)}
                    $grid
                  />
                ))}
              </FeaturedGrid>
              {posts.length > 3 && (
                <SeeAllRow>
                  <SeeAllBtn onClick={() => navigate('/blog')}>See All</SeeAllBtn>
                </SeeAllRow>
              )}
            </>
          )}
        </FeaturedInner>
      </FeaturedSection>
    </>
  )
}

const HeroSection = styled.section`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`



const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 2rem 6rem;

  @media (max-width: 640px) {
    padding: 3rem 1.25rem 4rem;
  }
`

const HeroLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 0.82rem;
    font-family: 'DM Sans', sans-serif;
    color: var(--neutral-color);
    letter-spacing: 0.05em;
  }
`

const HeroDash = styled.span`
  display: inline-block;
  width: 40px;
  height: 1.5px;
  background: var(--neutral-color);
  border-radius: 2px;
  flex-shrink: 0;
`

const HeroHeading = styled.h1`
  font-family: 'Libre Caslon Text', serif;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-dark);
  max-width: 560px;
`

const HeroBlob = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;

  svg {
    width: 100%;
    height: 180px;

    path {
      fill: var(--primary-color);
    }
  }

  @media (max-width: 768px) {
    svg {
      height: auto;
    }
  }
`

const FeaturedSection = styled.section`
  background: var(--background-color);
  padding: 5rem 0 6rem;

  @media (max-width: 640px) {
    padding: 3rem 0 4rem;
  }
`

const FeaturedInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const SectionHeading = styled.h2`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2.5rem;
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
  margin-bottom: 2rem;
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

const SeeAllRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const SeeAllBtn = styled.button`
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: var(--neutral-color);
  padding: 0.6rem 2rem;
  transition: border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`

const Empty = styled.p`
  padding: 3rem 0;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export default Home
