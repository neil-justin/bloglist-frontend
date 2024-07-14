const LoginForm = ({
    username,
    onUsernameChange,
    password,
    onPasswordChange,
    onHandleLogin
}) => {
    return (
        <div>
            <h2>Log in to app</h2>
            <form onSubmit={onHandleLogin}>
                <div>
                    username {' '}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={onUsernameChange}
                    />
                </div>
                <div>
                    password {' '}
                    <input
                        type="text"
                        value={password}
                        name="Username"
                        onChange={onPasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm