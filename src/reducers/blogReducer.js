import { createSlice } from '@reduxjs/toolkit'
import { create, getAll, put, remove, putComments } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    like(state, action) {
      const id = action.payload.id
      const updatedState = state.map((blog) => {
        if (blog.id === id) return action.payload
        return blog
      })

      return updatedState
    },
    removeBlog(state, action) {
      const id = action.payload.id
      const updatedState = state.filter((blog) => blog.id !== id)
      return updatedState
    },
    setComments(state, action) {
      const id = action.payload.id
      const updatedState = state.map((blog) => {
        if (blog.id === id) return action.payload
        return blog
      })

      return updatedState
    }
  },
})

export const { appendBlog, setBlogs, like, removeBlog, setComments } =
  blogSlice.actions

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(setBlogs(blogs))
  }
}

const createBlog = (blogObj) => {
  return async (dispatch) => {
    const blog = await create(blogObj)
    dispatch(appendBlog(blog))
  }
}

const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await put(blog)
    dispatch(like(updatedBlog))
  }
}

const deleteBlog = (blog) => {
  return async (dispatch) => {
    await remove(blog)
    dispatch(removeBlog(blog))
  }
}

const submitComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    const promisedBlog = await putComments(updatedBlog)
    dispatch(setComments(promisedBlog))
  }
}

export { initializeBlogs, createBlog, likeBlog, deleteBlog, submitComment }
export default blogSlice.reducer
