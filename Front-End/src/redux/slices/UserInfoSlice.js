import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../api/BaseRequest'

export const userInfo = createAsyncThunk('api/userInfo', async(params) => {
  const { data } = await get(`api/userInfo?${params}`)
  console.log(data)
  return data
})

const initialState = {
  loading: false,
  userData: {}
}

const UserInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.userData = action.payload
      state.loading = false
    })
    builder.addCase(userInfo.rejected, (state) => {
      state.loading = false
    })
  }
})

export default UserInfoSlice.reducer
