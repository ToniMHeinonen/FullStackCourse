import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  hideNotification,
  showNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }

    return anecdotes.filter((a) => a.content.includes(filter))
  })
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`you voted '${content}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
