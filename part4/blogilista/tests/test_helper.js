const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 3,
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 10,
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'sekret',
  },
  {
    username: 'user123',
    name: 'John Matthew',
    password: 'password123',
  },
  {
    username: 'user2',
    name: 'Donald Duck',
    password: 'pass123',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const initializeUsers = async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    })
    await newUser.save()
  }
}

const userToken = async (api, username, password) => {
  const user = {
    username: username || 'user123',
    password: password || 'password123',
  }

  const result = await api.post('/api/login').send(user)

  return `bearer ${result.body.token}`
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  userToken,
  initializeUsers,
}
