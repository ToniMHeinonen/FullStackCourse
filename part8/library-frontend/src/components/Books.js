import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { allGenres } from '../utils/constants'
import BookList from './BookList'

const Books = (props) => {
  const [genre, setGenre] = useState(allGenres)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const selectedStyle = {
    backgroundColor: 'lightblue',
  }

  const books = result.data.allBooks

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

      <BookList books={books} genre={genre} />
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
