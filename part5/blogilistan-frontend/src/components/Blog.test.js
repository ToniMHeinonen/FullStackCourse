import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing blog title',
    author: 'Testing blog author',
  }

  render(<Blog blog={blog} />)

  screen.getByText('Testing blog title', { exact: false })
  screen.getByText('Testing blog author', { exact: false })
})

test('hides url and likes at start', () => {
  const blog = {
    title: 'Testing blog title',
    author: 'Testing blog author',
    url: 'Testing blog url',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const urlElement = screen.queryByText('Testing blog url')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(10)
  expect(likesElement).toBeNull()
})
