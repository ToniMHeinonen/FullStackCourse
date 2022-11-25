import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const allGenres = 'all genres'
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

  const showBook = (book) => {
    if (genre === allGenres || book.genres.includes(genre)) {
      return (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      )
    }

    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => showBook(b))}
        </tbody>
      </table>
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
