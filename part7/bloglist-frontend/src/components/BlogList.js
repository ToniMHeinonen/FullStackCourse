import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const dispatch = useDispatch()

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div id="blogs-list">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteBlog={() => removeBlog(blog)}
          updateBlog={() => dispatch(likeBlog(blog))}
        />
      ))}
    </div>
  )
}

export default BlogList
