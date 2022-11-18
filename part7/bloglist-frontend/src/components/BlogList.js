import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <div id="blogs-list">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteBlog={() => console.log('Delete')}
          updateBlog={() => console.log('Update')}
        />
      ))}
    </div>
  )
}

export default BlogList
