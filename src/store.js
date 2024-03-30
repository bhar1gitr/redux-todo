import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './Features/Todo'

export default configureStore({
  reducer: {
    todo: todoReducer
  }
})