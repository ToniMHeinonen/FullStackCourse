import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button } from '../styles/buttons'

const BlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    const create = await dispatch(createBlog(blog))

    if (create.status === 'success') {
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleRef.current.toggleVisibility()
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <Button id="submit-blog" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleRef: PropTypes.object.isRequired,
}

export default BlogForm
