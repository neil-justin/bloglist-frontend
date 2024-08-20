import { createSlice } from '@reduxjs/toolkit'

const sortSlice = createSlice({
  name: 'sorted',
  initialState: false,
  reducers: {
    setShouldSort(state, action) {
      return !action.payload
    },
  },
})

export const { setShouldSort } = sortSlice.actions
export default sortSlice.reducer
