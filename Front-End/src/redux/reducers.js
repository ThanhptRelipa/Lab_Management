import { combineReducers } from '@reduxjs/toolkit'

import UserInfoSlice from './slices/UserInfoSlice'
import StepSlice from './slices/StepSlice'

export default combineReducers({
  userInfo: UserInfoSlice,
  step: StepSlice
})
