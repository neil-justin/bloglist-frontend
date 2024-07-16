import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll, setToken, create } from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      console.error(exception)
      console.log('wrong credentials')
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleCreateBlog = (blog) => {
    create(blog)
  }

  if (user === null) {
    return <LoginForm
      username={username}
      onUsernameChange={handleUsernameChange}
      password={password}
      onPasswordChange={handlePasswordChange}
      onHandleLogin={handleLogin}
    />
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in {' '}
        <button
          type="button"
          onClick={handleLogout}
        >logout</button>
      </p>
      <h2>create new</h2>
      <NewBlogForm
        title={title}
        onTitleChange={handleTitleChange}
        author={author}
        onAuthorChange={handleAuthorChange}
        url={url}
        onUrlChange={handleUrlChange}
        onCreateBlog={handleCreateBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App