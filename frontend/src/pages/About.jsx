import styled from "styled-components";

const About = () => {
  return (
    <Page>
      <Container>
        <Title>About</Title>
        <Body>
          <p>
            When I was younger, I sat with my phone, completely engrossed in a
            movie called The Fault in Our Stars. One of the lead characters
            spoke about his greatest fear being oblivion which is the idea that one
            day, he would be forgotten. But he was quickly reminded that, no
            matter how much we resist it, we will all eventually fade from
            memory. A thousand years from now, our names, voices, and stories
            may disappear. It is inevitable. But what if I do not want to
            disappear quietly? What if I want to leave a carving somewhere in
            this world, something that says, I was here? 
            <br />
            This space is my
            attempt at that. A collection of thoughts, perspectives, memories,
            emotions, and moments that mattered to me. The things I loved, the
            things I questioned, the nights I could not sleep, the people I met,
            the experiences that shaped me, and the ideas that stayed with me
            longer than they should have. Maybe none of this lasts forever.
            Maybe one day it all disappears into silence. But for now, these
            words exist. And as long as they do, a part of me exists with them.
            <br/>
            This is not just a website. It is my archive.
          </p>
        </Body>
      </Container>
    </Page>
  );
};

const Page = styled.div`
  background: var(--background-color);
  min-height: calc(100vh - 64px);
  padding: 3rem 0 6rem;
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-family: "Libre Caslon Text", serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    font-size: 1.7rem;
  }
`;

const Body = styled.div`
  font-family: "DM Sans", sans-serif;
  font-size: 0.975rem;
  line-height: 1.85;
  color: var(--text-muted);
`;

export default About;
