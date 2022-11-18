import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm /> ', () => {
  test('Updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Title test')
    await user.type(authorInput, 'Author test')
    await user.type(urlInput, 'Url test')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Title test')
    expect(createBlog.mock.calls[0][0].author).toBe('Author test')
    expect(createBlog.mock.calls[0][0].url).toBe('Url test')
  })
})
