import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getUsers()
    dispatch(setUsers(users))
  }
}

export { initializeUsers }
export default usersSlice.reducer