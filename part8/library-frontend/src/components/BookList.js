import { allGenres } from '../utils/constants'

const BookList = ({ books, genre }) => {
  const showBook = (book) => {
    if (!genre || genre === allGenres || book.genres.includes(genre)) {
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
    </div>
  )
}

export default BookList
