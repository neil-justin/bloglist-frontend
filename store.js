import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationReducer'
import blogReducer from './src/reducers/blogReducer'
import sortReducer from './src/reducers/sortReducer'
import userReducer from './src/reducers/userReducer'
import usersReducer from './src/reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    sorted: sortReducer,
    user: userReducer,
    users: usersReducer
  },
})

export default store
