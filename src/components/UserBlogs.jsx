const UserBlogs = ({ user }) => {
  if (!user) return null

  if (user.blogs.length < 1) {
    return  <p>{user.name} have no blogs</p>
  }

  return (
    <>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </>
  )
}

export default UserBlogs
