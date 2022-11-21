import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.section`
  display: inline-block;
`

export const BlogContent = styled.button`
  padding: 5px;
  margin-right: 10px;
  border-style: dashed;
  border-width: 3px;
  margin-bottom: 5px;
  border-radius: 5px;
  border-color: black;
`

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #0bcadb;
  }
`

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <Wrapper id="blogs-list">
      {blogs.map((blog) => (
        <BlogContent key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </StyledLink>
        </BlogContent>
      ))}
    </Wrapper>
  )
}

export default BlogList
