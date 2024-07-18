import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAll, setToken, create } from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')

  const newBlogFormRef = useRef()

  useEffect(() => {
    getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setToken(null)
    setUser(null)
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

    const dbBlog = await create(blogDetails)

    setBlogs([...blogs, dbBlog])
    setNotificationMessage(`a new blog titled ${dbBlog.title} is added`)
    setTimeout(() => {
      setNotificationMessage('')
    }, 5000)
  }

  const handleBlogUpdate = (updatedBlog) => {
    const nextBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog
      } else {
        return blog
      }
    })

    setBlogs(nextBlogs)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to app</h2>
        <Notification message={notificationMessage} />
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
      <Notification message={notificationMessage} />
      <p>
        {user.name} logged in {' '}
        <button
          type="button"
          onClick={handleLogout}
        >logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
        <NewBlogForm
          onCreateBlog={handleCreateBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onBlogUpdate={handleBlogUpdate}
        />
      )}
    </div>
  )
}

export default App