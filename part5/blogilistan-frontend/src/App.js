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
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loadBlogs = async () => {
    await blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)))
  }

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
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

      const updatedBlog = await blogService.update(changedBlog.id, changedBlog)

      // For some reason user is not converted correctly when updating blogs
      // even though the code is pretty much identical to example code
      updatedBlog.user = blog.user

      const modifiedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )

      await setBlogs(sortBlogs(modifiedBlogs))
    } catch (exception) {
      const error = exception.response.data.error
      showError(error)
      console.log(error)
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)

        showNotifaction(`blog ${blog.title} by ${blog.author} removed`)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        const error = exception.response.data.error
        showError(error)
        console.log(error)
      }
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
        <h2>Log in to application</h2>
        <Error message={error} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="login-username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="login-password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-submit" type="submit">
            login
          </button>
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

      <div id="blogs-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
