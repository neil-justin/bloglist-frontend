import { useState } from "react"
import { put } from "../services/blogs"

const Blog = ({
  blog,
  onBlogUpdate
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
    </p>
  )
}

export default Blog