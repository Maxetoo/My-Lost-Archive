import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { navData } from '../../data/navData'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const NavMenu = ({ open, onClose, isDark, onToggleTheme }) => {
  return (
    <Overlay $open={open} aria-hidden={!open}>
      <Top>
        <ThemeToggle onClick={onToggleTheme} aria-label="Toggle dark mode">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </ThemeToggle>
        <CloseBtn onClick={onClose} aria-label="Close menu">
          <span /><span />
        </CloseBtn>
      </Top>

      <Links aria-label="Mobile navigation">
        {navData.map(({ _id, title, path }) => (
          <LinkItem
            key={_id}
            to={path}
            end={path === '/'}
            onClick={onClose}
          >
            {title}
          </LinkItem>
        ))}
      </Links>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--background-color);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem 2.5rem;
  transform: translateY(${({ $open }) => ($open ? '0' : '-100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  margin-bottom: 2rem;
  flex-shrink: 0;
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

const CloseBtn = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    position: absolute;
    display: block;
    width: 16px;
    height: 1.5px;
    background: #fff;
    border-radius: 2px;

    &:first-child {
      transform: rotate(45deg);
    }
    &:last-child {
      transform: rotate(-45deg);
    }
  }
`

const Links = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`

const LinkItem = styled(NavLink)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.4rem;
  color: var(--neutral-color);
  text-align: left;
  padding: 0;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 150ms ease;

  &.active {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
`

export default NavMenu
