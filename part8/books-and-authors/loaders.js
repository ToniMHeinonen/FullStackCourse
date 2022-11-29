const Book = require('./models/book')

const batchBooks = async (keys) => {
  const books = await Book.find({})

  return keys.map((key) => books.filter((book) => String(book.author) === key))
}

module.exports = { batchBooks }
