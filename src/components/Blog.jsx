import PropTypes from 'prop-types'

import { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [shouldHideDetails, setShouldHideDetails] = useState(true)

  const handleButtonDetailsClick = (e) => {
    setShouldHideDetails(!shouldHideDetails)
  }

  const handleLikeButtonClick = async (e, oldBlog) => {
    const { user, ...blogExceptUser } = oldBlog
    const blog = { ...blogExceptUser, likes: blogExceptUser.likes + 1 }
    dispatch(likeBlog(blog))
  }

  const handleRemoveBlogClick = async (e, blog) => {
    const shouldDeleteBlog = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )

    if (shouldDeleteBlog) {
      dispatch(deleteBlog(blog))
    }
  }

  if (shouldHideDetails) {
    return (
      <>
        {blog.title} {blog.author}{' '}
        <button onClick={handleButtonDetailsClick}>view</button>
      </>
    )
  }

  return (
    <>
      {blog.title} <button onClick={handleButtonDetailsClick}>hide</button>{' '}
      <br />
      {blog.url} <br />
      likes <span data-testid="likescount">{blog.likes} </span>
      <button onClick={(e) => handleLikeButtonClick(e, blog)}>like</button>{' '}
      <br />
      {blog.author} <br />
      <button onClick={(e) => handleRemoveBlogClick(e, blog)}>remove</button>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
