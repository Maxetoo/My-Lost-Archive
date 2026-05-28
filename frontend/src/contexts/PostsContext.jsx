import { createContext, useContext, useState, useEffect } from 'react'
import { fetchPosts } from '../services/posts'

const PostsContext = createContext({ posts: [], loading: true })

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PostsContext.Provider value={{ posts, loading }}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext).posts
export const usePostsLoading = () => useContext(PostsContext).loading
