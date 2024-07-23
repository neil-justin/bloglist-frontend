const LoginForm = ({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  onHandleLogin
}) => {
  return (
    <div>
      <form onSubmit={onHandleLogin}>
        <div>
          username {' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
            data-testid="username-input"
          />
        </div>
        <div>
          password {' '}
          <input
            type="text"
            value={password}
            name="Username"
            onChange={onPasswordChange}
            data-testid="password-input"
          />
        </div>
        <button
          type="submit"
          data-testid="login-button"
        >login</button>
      </form>
    </div>
  )
}

export default LoginForm