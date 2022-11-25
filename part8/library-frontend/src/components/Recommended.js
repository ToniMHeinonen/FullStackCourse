import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookList from './BookList'

const Recommended = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  if (!show) {
    return null
  }

  if (booksResult.loading || userResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks

  const genre = userResult.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>

      <BookList books={books} genre={genre} />
    </div>
  )
}

export default Recommended
