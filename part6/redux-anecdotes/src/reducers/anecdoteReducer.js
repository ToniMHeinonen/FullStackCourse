import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload)
      const modified = { ...anecdote, votes: anecdote.votes + 1 }
      const modifiedState = state.map((a) =>
        a.id !== modified.id ? a : modified
      )
      return modifiedState.sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
