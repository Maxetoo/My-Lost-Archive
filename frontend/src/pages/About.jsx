import styled from 'styled-components'

const About = () => {
  return (
    <Page>
      <Container>
        <Title>About</Title>
        <Body>
          <p>My Lost Archive is a personal space for thoughts, essays, and ideas by Maxwell.</p>
        </Body>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  padding: 3rem 0 6rem;
`

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const Title = styled.h1`
  font-family: 'Libre Caslon Text', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    font-size: 1.7rem;
  }
`

const Body = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.975rem;
  line-height: 1.85;
  color: var(--text-muted);
`

export default About
