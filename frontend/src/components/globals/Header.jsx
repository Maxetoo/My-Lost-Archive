import { useState } from 'react'
import styled from 'styled-components'
import { navData } from '../../data/navData'
import NavMenu from './NavMenu'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Header = ({ currentPage, navigate, isDark, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (page) => {
    navigate(page)
    setMenuOpen(false)
  }

  return (
    <>
      <Wrapper>
        <Inner>
          <Nav aria-label="Main navigation">
            {navData.map(({ _id, title, page }) => (
              <NavBtn
                key={_id}
                $active={currentPage === page}
                onClick={() => handleNav(page)}
              >
                {title}
              </NavBtn>
            ))}
          </Nav>

          <ThemeToggle onClick={onToggleTheme} aria-label="Toggle dark mode">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </ThemeToggle>

          <Hamburger
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </Hamburger>
        </Inner>
      </Wrapper>

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={handleNav}
        currentPage={currentPage}
      />
    </>
  )
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: var(--background-color);
  z-index: 500;
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.88rem;
  font-family: 'DM Sans', sans-serif;
  color: var(--neutral-color);
  padding: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  text-decoration-thickness: 1.5px;
  text-underline-offset: 5px;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 1;
  }
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--neutral-color);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 150ms ease;

  &:hover {
    color: var(--primary-color);
  }
`

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;

  span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--text-dark);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

export default Header
