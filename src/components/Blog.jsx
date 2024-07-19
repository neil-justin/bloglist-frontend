import PropTypes from 'prop-types'

import { useState } from 'react'
import { put, remove } from '../services/blogs'

const Blog = ({
  blog,
  onBlogUpdate,
  onBlogRemoval
}) => {
  const [shouldHideDetails, setShouldHideDetails] = useState(true)

  const handleButtonDetailsClick = (e) => {
    setShouldHideDetails(!shouldHideDetails)
  }

  const handleLikeButtonClick = async (e, oldBlog) => {
    // this copied the oldBlog object except for its "user" prop
    const { user, ...blogExceptUser } = oldBlog
    const blog = { ...blogExceptUser, likes: blogExceptUser.likes + 1 }
    const updatedBlog = await put(blog)
    onBlogUpdate(updatedBlog)
  }

  const handleRemoveBlogClick = async (e, blog) => {
    const shouldDeleteBlog = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (shouldDeleteBlog) {
      await remove(blog)
      onBlogRemoval(blog)
    }
  }

  if (shouldHideDetails) {
    return (
      <p className="blog-card">
        {blog.title} {blog.author} {' '}
        <button onClick={handleButtonDetailsClick}>view</button>
      </p>
    )
  }

  return (
    <p className="blog-card">
      {blog.title} {' '}
      <button onClick={handleButtonDetailsClick}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} {' '}
      <button onClick={(e) => handleLikeButtonClick(e, blog)}>like</button> <br />
      {blog.author} <br />
      <button onClick={(e) => handleRemoveBlogClick(e, blog)}>remove</button>
    </p>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
  onBlogRemoval: PropTypes.func.isRequired
}

export default Blog