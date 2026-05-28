import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NotFound = () => {
  return (
    <Page>
      <Container>
        <Code>404</Code>
        <Title>Page not found</Title>
        <Body>The page you're looking for doesn't exist or has been moved.</Body>
        <HomeLink to="/">Go back home</HomeLink>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
`

const Container = styled.div`
  max-width: 480px;
  text-align: center;
`

const Code = styled.p`
  font-family: 'Libre Caslon Text', serif;
  font-size: 6rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1.25rem;
`

const Title = styled.h1`
  font-family: 'Libre Caslon Text', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.75rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const Body = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.975rem;
  line-height: 1.85;
  color: var(--text-muted);
  margin-bottom: 2rem;
`

const HomeLink = styled(Link)`
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dark);
  background: var(--primary-color);
  padding: 0.6rem 1.5rem;
  border-radius: var(--border-radius-pill);
  text-decoration: none;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }
`

export default NotFound
