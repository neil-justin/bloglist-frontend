import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users