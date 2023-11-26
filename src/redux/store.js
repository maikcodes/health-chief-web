import { configureStore } from '@reduxjs/toolkit'
import { UserInfo } from '../models/User'
import userSliceReducer from './states/user'

export const AppStore = {
  user: UserInfo
}

export default configureStore({
  reducer: {
    user: userSliceReducer
  }
})
