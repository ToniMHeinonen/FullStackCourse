import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    showError(state, action) {
      return action.payload
    },
    clearError() {
      return ''
    },
  },
})

export const { showError, clearError } = errorSlice.actions

export const setError = (message, seconds) => {
  return async (dispatch) => {
    console.log('setError')
    dispatch(showError(message))
    setTimeout(() => {
      dispatch(clearError())
    }, (seconds || 5) * 1000)
  }
}

export default errorSlice.reducer
