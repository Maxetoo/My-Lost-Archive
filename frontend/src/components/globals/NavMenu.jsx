import styled from 'styled-components'
import { navData } from '../../data/navData'

const NavMenu = ({ open, onClose, navigate, currentPage }) => {
  return (
    <Overlay $open={open} aria-hidden={!open}>
      <Top>
        <Logo onClick={() => navigate('home')}>My Lost Archive</Logo>
        <CloseBtn onClick={onClose} aria-label="Close menu">
          <span /><span />
        </CloseBtn>
      </Top>

      <Links aria-label="Mobile navigation">
        {navData.map(({ _id, title, page }) => (
          <LinkBtn
            key={_id}
            $active={currentPage === page}
            onClick={() => navigate(page)}
          >
            {title}
          </LinkBtn>
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

const Logo = styled.button`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-dark);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
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

const LinkBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.4rem;
  color: var(--neutral-color);
  text-align: left;
  padding: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: opacity 150ms ease;

  &:hover {
    opacity: 1;
  }
`

export default NavMenu
