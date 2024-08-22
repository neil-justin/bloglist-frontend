import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { Link, NavLink } from 'react-router-dom'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setToken(null)
    dispatch(setUser(null))
  }

  return (
    <>
      <NavLink to='/'>blogs</NavLink> {' '}
      <NavLink to='/users'>users</NavLink> {' '}
      {user.name} logged in {' '}
      <button type="button" onClick={handleLogout}>
          logout
      </button>
    </>
  )
}

export default Menu