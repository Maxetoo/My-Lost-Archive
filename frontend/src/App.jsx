import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/globals/Header'
import Footer from './components/globals/Footer'
import Home from './pages/Home'
import About from './pages/About'
import BlogFeed from './components/blog/BlogFeed'
import BlogDetail from './components/blog/BlogDetail'
import { PostsProvider } from './contexts/PostsContext'
import ScrollToTop from './helpers/ScrollToTop'

const App = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <BrowserRouter>
      <PostsProvider>
        <ScrollToTop />
        <SiteLayout>
          <Header isDark={isDark} onToggleTheme={() => setIsDark(d => !d)} />

          <SiteMain>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<BlogFeed />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </SiteMain>

          <Footer />
        </SiteLayout>
      </PostsProvider>
    </BrowserRouter>
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
