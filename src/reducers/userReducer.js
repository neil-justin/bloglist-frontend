import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../services/blogs'
import login from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setToken(user.token)
    dispatch(setUser(user))
  }
}

export { loginUser }
export default userSlice.reducer
