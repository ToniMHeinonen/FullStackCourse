import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const divStyle = { backgroundColor: 'lightGrey', padding: 5 }

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <div style={divStyle}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
