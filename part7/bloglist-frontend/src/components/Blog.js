import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

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
        <div></div>
      )}
    </div>
  )
}

export default Blog
