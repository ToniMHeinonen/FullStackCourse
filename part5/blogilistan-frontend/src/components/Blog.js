import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: '#008CBA',
    borderRadius: '5px',
    border: 'none',
  }

  return (
    <div style={blogStyle}>
      {visible ? (
        <>
          <div onClick={() => setVisible(false)}>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setVisible(false)}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'Undefined user'}</div>
          {user.username === blog.user?.username ? (
            <button style={removeButtonStyle} onClick={() => deleteBlog(blog)}>
              remove
            </button>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div onClick={() => setVisible(true)}>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(true)}>show</button>
        </div>
      )}
    </div>
  )
}

export default Blog
