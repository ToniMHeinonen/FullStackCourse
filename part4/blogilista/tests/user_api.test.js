const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user123',
      name: 'John Matthew',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username is too short', async () => {
    const newUser = {
      username: 'us',
      name: 'John Matthew',
      password: 'password123',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Path `username` (`us`) is shorter than the minimum allowed length (3)'
    )
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'user123',
      name: 'John Matthew',
      password: 'pa',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Path `password` (`pa`) is shorter than the minimum allowed length (3)'
    )
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
