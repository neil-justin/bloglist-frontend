import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  const chosenBlog = match ? blogs.find(blog =>
    blog.id === match.params.id) : null

  console.log('chosenBlog', chosenBlog)

  if (!chosenBlog) return null

  return (
    <>
      <h3>{chosenBlog.title}</h3>
      <p>
        <a href={chosenBlog.url}>{chosenBlog.url}</a> <br />
        {chosenBlog.likes} likes <br />
        added by {chosenBlog.author}
      </p>

      <h3>comments</h3>
      <ul>
        {chosenBlog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails