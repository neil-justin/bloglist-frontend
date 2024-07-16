const NewBlogForm = ({
    title,
    onTitleChange,
    author,
    onAuthorChange,
    url,
    onUrlChange,
    onCreateBlog
}) => {
    return (
        <div>
            <form onSubmit={(e) => onCreateBlog(e, { title, author, url })}>
                <div>
                    {'title: '}
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={onTitleChange}
                    />
                </div>
                <div>
                    {'author: '}
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={onAuthorChange}
                    />
                </div>
                <div>
                    {'url: '}
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={onUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm