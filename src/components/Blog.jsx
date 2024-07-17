import { useState } from "react"

const Blog = ({ blog }) => {
  const [shouldHideDetails, setShouldHideDetails] = useState(true)

  const handleButtonClick = (e) => {
    setShouldHideDetails(!shouldHideDetails)
  }

  if (shouldHideDetails) {
    return (
      <p className="blog-card">
        {blog.title} {blog.author} {' '}
        <button onClick={handleButtonClick}>view</button>
      </p>
    )
  }

  return (
    <p className="blog-card">
      {blog.title} {' '}
      <button onClick={handleButtonClick}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} <br />
      {blog.author} <br />
    </p>
  )
}

export default Blog