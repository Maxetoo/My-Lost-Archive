import { createContext, useContext, useState, useEffect } from 'react'
import { fetchPosts } from '../services/posts'

const PostsContext = createContext([])

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error)
  }, [])

  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
}

export const usePosts = () => useContext(PostsContext)
