import { configureStore } from '@reduxjs/toolkit'

import studentReducer from './reducers/studentReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    students: studentReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})

export default store