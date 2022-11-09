import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    loadBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const loadBlogs = async () => {
    await blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    try {
      await blogService.create(blog)

      loadBlogs()
      showNotifaction(`a new blog ${blog.title} by ${blog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      const error = exception.response.data.error
      showError(error)
      console.log(error)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1 }

      console.log(changedBlog)

      const updatedBlog = await blogService.update(changedBlog.id, changedBlog)

      await setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    } catch (exception) {
      const error = exception.response.data.error
      showError(error)
      console.log(error)
    }
  }

  const showNotifaction = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to applicatiopn</h2>
        <Error message={error} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Error message={error} />
      <Notification message={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  )
}

export default App
