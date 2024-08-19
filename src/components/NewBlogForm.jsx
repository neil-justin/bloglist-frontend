import { useState } from 'react'

const NewBlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleBlogSubmission = (e) => {
    onCreateBlog(e, { title, author, url })
  }

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(e) => handleBlogSubmission(e)}
        data-testid="new-blogform"
      >
        <div>
          {'title: '}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder="title"
            data-testid="blogtitle-input"
          />
        </div>
        <div>
          {'author: '}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="author"
            data-testid="blogauthor-input"
          />
        </div>
        <div>
          {'url: '}
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            placeholder="url"
            data-testid="blogurl-input"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
