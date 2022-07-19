import { combineReducers } from '@reduxjs/toolkit'

import UserInfoSlice from './slices/UserInfoSlice'

export default combineReducers({
  userInfo: UserInfoSlice
})
