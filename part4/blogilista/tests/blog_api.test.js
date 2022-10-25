const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

afterAll(() => {
  mongoose.connection.close()
})
