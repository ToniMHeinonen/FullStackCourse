const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has id field', async () => {
    const blogs = await helper.blogsInDb()

    expect(blogs[0].id).toBeDefined()
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Test title',
        author: 'Test author',
        url: 'Test url',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((b) => b.title)
      expect(titles).toContain('Test title')
    })

    test('a blog has 0 likes if not defined', async () => {
      const newBlog = {
        title: 'Test title',
        author: 'Test author',
        url: 'Test url',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[helper.initialBlogs.length].likes).toBe(0)
    })

    test('a blog with no title or url should not be added', async () => {
      const newBlog = {
        author: 'Test author',
        likes: 20,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogs = await helper.blogsInDb()
      expect(blogs.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
