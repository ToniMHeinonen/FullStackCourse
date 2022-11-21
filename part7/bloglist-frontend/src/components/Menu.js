import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import styled from 'styled-components'
import { Button } from '../styles/buttons'

const NavMenu = styled.section`
  background-color: snow;
  padding: 5px;
  border: solid;
  border-width: 2px;
  border-radius: 8px;
  display: flex;
`

const StyledLink = styled(Link)`
  font-weight: bold;
  color: black;
  padding: 0px 20px;
  align-self: center;
  font-size: 1.5em;
  text-decoration: none;
  &:hover {
    color: orange;
  }
`

const LoginInfo = styled.b`
  margin-left: auto;
`

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <NavMenu>
      <StyledLink to="/">Blogs</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      <LoginInfo>
        {user.name} logged in <Button onClick={handleLogout}>logout</Button>
      </LoginInfo>
    </NavMenu>
  )
}

export default Menu
