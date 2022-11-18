import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(({ userList }) => {
    return userList
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td></td>
          <td>
            <strong>blogs created</strong>
          </td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default UserList
