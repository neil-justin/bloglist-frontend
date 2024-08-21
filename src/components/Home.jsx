import { useRef } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setShouldSort } from '../reducers/sortReducer'

const Home = () => {
  const blogs = useSelector((state) => state.blogs)
  const sorted = useSelector((state) => state.sorted)

  const descendinglySortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogsToDisplay = sorted ? descendinglySortedBlogs : blogs

  const newBlogFormRef = useRef()

  const dispatch = useDispatch()

  const handleCreateBlog = async (e, blogDetails) => {
    e.preventDefault()
    newBlogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogDetails))
    dispatch(setNotification(`a new blog titled ${blogDetails.title} is added`))
  }

  const handleSortBlogsClick = (e) => {
    dispatch(setShouldSort())
  }

  return (
    <>
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlogForm onCreateBlog={handleCreateBlog} />
      </Togglable>
      <button onClick={handleSortBlogsClick}>sort blogs - descending</button>
      <div className="blog-cards">
        {blogsToDisplay.map((blog) => (
          <p
            className="blog-card"
            data-testid={`blog-${blog.id}`}
            key={blog.id}
          >
            <Blog blog={blog} />
          </p>
        ))}
      </div>
    </>
  )
}

export default Home