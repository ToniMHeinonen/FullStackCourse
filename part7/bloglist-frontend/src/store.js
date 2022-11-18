import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import errorReducer from './reducers/errorReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    error: errorReducer,
  },
})

export default store
