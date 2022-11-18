import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> ', () => {
  const title = 'Testing blog title'
  const author = 'Testing blog author'
  const url = 'Testing blog url'
  const likes = 10

  const blog = {
    title,
    author,
    url,
    likes,
  }

  const user = {
    username: 'Alias',
  }

  describe('Using simple blog', () => {
    beforeEach(() => {
      render(
        <Blog
          blog={blog}
          user={user}
          deleteBlog={() => {}}
          updateBlog={() => {}}
        />
      ).container
    })

    test('renders title and author', () => {
      screen.getByText(title, { exact: false })
      screen.getByText(author, { exact: false })
    })

    test('hides url and likes at start', () => {
      const urlElement = screen.queryByText(url)
      expect(urlElement).toBeNull()

      const likesElement = screen.queryByText(10)
      expect(likesElement).toBeNull()
    })

    test('clicking the show button displays url and likes', async () => {
      const user = userEvent.setup()

      const button = screen.getByText('show')
      await user.click(button)

      screen.getByText(url)
      screen.getByText(likes, { exact: false })
    })
  })

  test('clicking likes button twice registers correctly', async () => {
    const mockHandler = jest.fn()

    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={() => {}}
        updateBlog={mockHandler}
      />
    )

    const userAgent = userEvent.setup()

    const showButton = screen.getByText('show')
    await userAgent.click(showButton)

    const likeButton = container.querySelector('#like-button')
    await userAgent.click(likeButton)
    await userAgent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
