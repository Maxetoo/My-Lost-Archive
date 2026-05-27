import { useState } from 'react'
import styled from 'styled-components'

const HeadphonesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="12" height="12" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="12" height="12" aria-hidden="true">
    <path d="M6 19h4V5H6zm8-14v14h4V5z" />
  </svg>
)

const AudioCard = ({ item }) => {
  const [playing, setPlaying] = useState(false)

  return (
    <Card>
      <TypeLabel>
        <HeadphonesIcon />
        <span>Audio</span>
      </TypeLabel>

      <Title>{item.title}</Title>

      <Player>
        <PlayBtn
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </PlayBtn>

        <ProgressBar
          role="progressbar"
          aria-valuenow={item.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <ProgressFill $width={item.progress}>
            <ProgressDot />
          </ProgressFill>
        </ProgressBar>

        <Duration>{item.duration}</Duration>
      </Player>
    </Card>
  )
}

const Card = styled.div`
  padding: 1.75rem 0;
`

const TypeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--primary-color);
  font-size: 0.82rem;
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 0.75rem;
`

const Title = styled.h2`
  font-family: 'Libre Caslon Text', serif;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-dark);
  margin-bottom: 1.1rem;
`

const Player = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`

const PlayBtn = styled.button`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.88;
  }
`

const ProgressBar = styled.div`
  flex: 1;
  max-width: 320px;
  height: 3px;
  background: var(--border-color);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
`

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: var(--primary-color);
  border-radius: 3px;
  position: relative;
`

const ProgressDot = styled.span`
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
`

const Duration = styled.span`
  font-size: 0.78rem;
  color: var(--secondary-color);
  font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
`

export default AudioCard
