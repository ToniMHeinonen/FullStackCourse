const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const author = require('./models/author')
const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const bookAuthorFilter = (author) => {
  return [
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {
      $addFields: {
        author: {
          $arrayElemAt: ['$author', 0],
        },
      },
    },
    {
      $match: {
        'author.name': author,
      },
    },
  ]
}

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // All books
      if (!args.author && !args.genre) return Book.find({}).populate('author')

      // Filter only by genre
      const booksByGenre = { genres: { $in: [args.genre] } }

      if (!args.author && args.genre)
        return Book.find(booksByGenre).populate('author')

      // Filter only by author
      const bookFilter = bookAuthorFilter(args.author)

      if (args.author && !args.genre) return Book.aggregate(bookFilter)

      // Filter by genre and author
      bookFilter.push({
        $match: {
          genres: booksByGenre.genres,
        },
      })

      return Book.aggregate(bookFilter)
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    findAuthor: async (root, args) => {
      return Author.findOne({ name: args.name })
    },
  },
  Author: {
    bookCount: async (author, args, { loaders }) => {
      const books = await loaders.book.load(author.id)
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
      }

      const book = new Book({ ...args, author })
      try {
        await author.save()
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
