import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current: 0
}

const StepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    stepIncrement: (state, action) => {
      state.current = action.payload + 1
    }
  }
})

export const { stepIncrement } = StepSlice.actions
export default StepSlice.reducer
