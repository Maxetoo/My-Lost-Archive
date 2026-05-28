import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { navData } from '../../data/navData'

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <Bottom>
          <Links aria-label="Footer navigation">
            {navData.map(({ _id, title, path }) => (
              <FooterLink key={_id} to={path}>{title}</FooterLink>
            ))}
          </Links>
          <Copy>© {new Date().getFullYear()} My Lost Archive. All rights reserved.</Copy>
        </Bottom>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: var(--background-color);
  padding: 3.5rem 0 3rem;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const Links = styled.nav`
  display: flex;
  gap: 1.5rem;
`

const FooterLink = styled(Link)`
  font-size: 0.875rem;
  font-family: 'DM Sans', sans-serif;
  color: var(--neutral-color);
  text-decoration: none;
  opacity: 0.65;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 1;
  }
`

const Copy = styled.p`
  font-size: 0.8rem;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
`

export default Footer
