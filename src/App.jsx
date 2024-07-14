import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
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
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App