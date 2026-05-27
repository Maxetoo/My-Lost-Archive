import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from './components/globals/Header'
import Footer from './components/globals/Footer'
import Home from './pages/Home'
import BlogFeed from './components/blog/BlogFeed'
import BlogDetail from './components/blog/BlogDetail'

const App = () => {
  const [page, setPage] = useState('home')
  const [selectedPost, setSelectedPost] = useState(null)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const navigate = (targetPage, data = null) => {
    setSelectedPost(data)
    setPage(targetPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SiteLayout>
      <Header currentPage={page} navigate={navigate} isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} />

      <SiteMain>
        {page === 'home' && <Home navigate={navigate} />}
        {page === 'blog' && <BlogFeed navigate={navigate} />}
        {page === 'article' && <BlogDetail post={selectedPost} navigate={navigate} />}
      </SiteMain>

      <Footer navigate={navigate} />
    </SiteLayout>
  )
}

const SiteLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const SiteMain = styled.main`
  flex: 1;
  padding-top: 64px;
`

export default App
