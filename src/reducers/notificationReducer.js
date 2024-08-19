import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '' },
  reducers: {
    populateNotification(state, action) {
      return action.payload
    },
  },
})

export const { populateNotification } = notificationSlice.actions

export const setNotification = (text, ms = 5000) => {
  return async (dispatch) => {
    dispatch(populateNotification({ message: text }))
    setTimeout(() => {
      dispatch(populateNotification({ message: '' }))
    }, ms)
  }
}
export default notificationSlice.reducer
