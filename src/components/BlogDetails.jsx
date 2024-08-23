import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { submitComment } from '../reducers/blogReducer'

const BlogDetails = () => {
  const [comment, setComment] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')
  const chosenBlog = match ? blogs.find(blog =>
    blog.id === match.params.id) : null

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const handleCommentSubmission = e => {
    e.preventDefault()
    dispatch(submitComment(chosenBlog, comment))
  }

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
      <form onSubmit={handleCommentSubmission}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
        />
        {' '}
        <button type="submit">add comment</button>
      </form>

      <ul>
        {chosenBlog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetails