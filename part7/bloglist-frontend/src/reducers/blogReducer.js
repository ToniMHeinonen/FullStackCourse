import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError } from './errorReducer'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    modifyBlog(state, action) {
      const blog = action.payload
      const modifiedState = state.map((a) => (a.id !== blog.id ? a : blog))
      return sortBlogs(modifiedState)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlogs, modifyBlog, removeBlog } =
  blogSlice.actions

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(sortBlogs(blogs)))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlogs(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
      return { status: 'success', blog: newBlog }
    } catch (exception) {
      const error = exception.response.data.error
      dispatch(setError(error))
      console.log(error)
      return { status: 'error', error }
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const modified = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(blog.id, modified)

      dispatch(modifyBlog(updatedBlog))
      return { status: 'success', blog: updatedBlog }
    } catch (exception) {
      const error = exception.response.data.error
      setError(error)
      console.log(error)
      return { status: 'error', error }
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)

      dispatch(setNotification(`blog ${blog.title} by ${blog.author} removed`))
      dispatch(removeBlog(blog.id))
      return { status: 'success' }
    } catch (exception) {
      const error = exception.response.data.error
      dispatch(setError(error))
      console.log(error)
      return { status: 'error', error }
    }
  }
}

export const createBlogComment = (blog, content) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.createBlogComment(blog.id, content)
      const modifiedBlog = {
        ...blog,
        comments: blog.comments.concat(newComment),
      }
      dispatch(modifyBlog(modifiedBlog))
      return { status: 'success', blog: modifiedBlog }
    } catch (exception) {
      const error = exception.response.data.error
      dispatch(setError(error))
      console.log(error)
      return { status: 'error', error }
    }
  }
}

export default blogSlice.reducer
