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
  },
})

export const { setBlogs, appendBlogs } = blogSlice.actions

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

export default blogSlice.reducer
