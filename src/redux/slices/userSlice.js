import { createSlice } from '@reduxjs/toolkit'
import * as types from "../actions/types"
const initialState = {
  userData: {},
  headerTitle:"",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateHeaderTitle: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.headerTitle = action.payload
    },
    updateUser: (state,action) => {
      state.userData = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {updateHeaderTitle,updateUser } = userSlice.actions

export default userSlice.reducer