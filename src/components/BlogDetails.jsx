import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  const chosenBlog = match ? blogs.find(blog =>
    blog.id === match.params.id) : null

  return (
    <>
      <h3>{chosenBlog.title}</h3>
      <p>
        {chosenBlog.url} <br />
        {chosenBlog.likes} likes <br />
        added by {chosenBlog.author}
      </p>
    </>
  )
}

export default BlogDetails