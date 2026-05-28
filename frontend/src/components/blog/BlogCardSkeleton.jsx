import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`

const Bone = styled.div`
  background: linear-gradient(
    90deg,
    var(--border-color) 25%,
    var(--surface-color) 50%,
    var(--border-color) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: 4px;
`

const BlogCardSkeleton = () => (
  <Card>
    <Bone style={{ width: 64, height: 10, marginBottom: '0.65rem' }} />
    <Bone style={{ width: '75%', height: 20, marginBottom: '0.5rem' }} />
    <Bone style={{ width: '55%', height: 20, marginBottom: '0.9rem' }} />
    <Bone style={{ width: '100%', height: 13, marginBottom: '0.4rem' }} />
    <Bone style={{ width: '88%', height: 13, marginBottom: '0.4rem' }} />
    <Bone style={{ width: '65%', height: 13 }} />
  </Card>
)

const Card = styled.div`
  padding: 1.75rem 0;
`

export default BlogCardSkeleton
