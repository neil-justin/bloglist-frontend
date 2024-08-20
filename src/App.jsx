import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAll, setToken, create } from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import './app.css'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setShouldSort } from './reducers/sortReducer'
import { loginUser, setUser } from './reducers/userReducer'

const App = () => {
  const sorted = useSelector((state) => state.sorted)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  // const [notificationMessage, setNotificationMessage] = useState('')

  const newBlogFormRef = useRef()

  const descendinglySortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogsToDisplay = sorted ? descendinglySortedBlogs : blogs

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))
      setToken(user.token)
      // setUser(user)
      // setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      // const user = await loginService.login({
      //   username,
      //   password,
      // })
      dispatch(loginUser({ username, password }))
      // window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // setToken(user.token)
      // setUser(user)
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
    // setUser(null)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleCreateBlog = async (e, blogDetails) => {
    e.preventDefault()
    newBlogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogDetails))
    dispatch(setNotification(`a new blog titled ${blogDetails.title} is added`))
  }

  const handleSortBlogsClick = (e) => {
    dispatch(setShouldSort())
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
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlogForm onCreateBlog={handleCreateBlog} />
      </Togglable>
      <button onClick={handleSortBlogsClick}>sort blogs - descending</button>
      <div className="blog-cards">
        {blogsToDisplay.map((blog) => (
          <p
            className="blog-card"
            data-testid={`blog-${blog.id}`}
            key={blog.id}
          >
            <Blog blog={blog} />
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
