import { useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { allGenres } from '../utils/constants'
import BookList from './BookList'
import { updateCache } from '../utils/cacheControls'

const Books = (props) => {
  const [genre, setGenre] = useState(allGenres)
  const allBooksResult = useQuery(ALL_BOOKS)
  const genreBooksResult = useQuery(ALL_BOOKS, {
    // Retrieve all books if genre is set to allGenres
    variables: { genre: genre === allGenres ? undefined : genre },
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      addedBook.genres.forEach((g, i) => {
        updateCache(
          client.cache,
          { query: ALL_BOOKS, variables: { genre: g } },
          addedBook
        )
      })
    },
  })

  if (!props.show) {
    return null
  }

  if (allBooksResult.loading || genreBooksResult.loading) {
    return <div>loading...</div>
  }

  const selectedStyle = {
    backgroundColor: 'lightblue',
  }

  const books = allBooksResult.data.allBooks
  const genreBooks = genreBooksResult.data.allBooks

  const genres = books.reduce((currentGenres, book) => {
    return [...new Set([...currentGenres, ...book.genres])]
  }, [])

  genres.push(allGenres)

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>

      <BookList books={genreBooks} />
      <div>
        {genres.map((g) => (
          <button
            style={g === genre ? selectedStyle : {}}
            key={g}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
