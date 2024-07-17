import { useState } from "react"

const NewBlogForm = ({
    onCreateBlog
}) => {
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

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => onCreateBlog(e, { title, author, url })}>
                <div>
                    {'title: '}
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    {'author: '}
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    {'url: '}
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm