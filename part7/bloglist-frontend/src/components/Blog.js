import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBlogComment,
  deleteBlog,
  likeBlog,
} from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = () => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const newComment = useField('text')

  const commentFields = { ...newComment, reset: undefined }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const request = await dispatch(deleteBlog(blog))

      if (request.status === 'success') {
        navigate('/')
      }
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    const request = await dispatch(
      createBlogComment(blog, { comment: newComment.value })
    )

    if (request.status === 'success') {
      newComment.reset()
    }
  }

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    borderRadius: '5px',
    border: 'none',
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}{' '}
        <button onClick={() => dispatch(likeBlog(blog))} id="like-button">
          like
        </button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'Undefined user'}</div>
      {user.username === blog.user?.username ? (
        <button style={removeButtonStyle} onClick={() => removeBlog(blog)}>
          remove
        </button>
      ) : (
        <></>
      )}
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input {...commentFields} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
