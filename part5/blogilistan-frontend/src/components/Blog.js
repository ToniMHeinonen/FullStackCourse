import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'Undefined author'}</div>
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
