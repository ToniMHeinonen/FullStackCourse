import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

let clearNotificationTimeout

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    clearTimeout(clearNotificationTimeout)

    dispatch(showNotification(message))
    clearNotificationTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, (seconds || 5) * 1000)
  }
}

export default notificationSlice.reducer
