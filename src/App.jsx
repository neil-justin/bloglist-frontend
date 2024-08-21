import { useState, useEffect } from 'react'
import { setToken } from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import './app.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, setUser } from './reducers/userReducer'
import { Route, Routes, useMatch } from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import { initializeUsers } from './reducers/usersReducer'
import UserBlogs from './components/UserBlogs'

const App = () => {
  const users = useSelector(state => state.users)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const match = useMatch('/users/:id')
  const chosenUser = match ? users.find(user =>
    user.id === match.params.id) : null

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setToken(null)
    dispatch(setUser(null))
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Notification />
        <LoginForm
          username={username}
          onUsernameChange={handleUsernameChange}
          password={password}
          onPasswordChange={handlePasswordChange}
          onHandleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='users/:id' element={<UserBlogs user={chosenUser}/>} />
      </Routes>
    </div>
  )
}

export default App
