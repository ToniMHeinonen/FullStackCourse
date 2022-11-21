import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { setError } from './reducers/errorReducer'
import { setUser } from './reducers/userReducer'
import UserList from './components/UserList'
import { initializeUserList } from './reducers/userListReducer'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setError('wrong username or password'))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error />
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
      <Router>
        <Menu />
        <h2>blog app</h2>
        <Error />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <BlogForm toggleRef={blogFormRef} />
                </Togglable>
                <BlogList />
              </div>
            }
          />
          <Route path="/users/" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
