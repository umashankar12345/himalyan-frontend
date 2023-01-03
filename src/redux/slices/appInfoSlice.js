import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  activeSidebar:"reviewer",
  headerTitle:""
}

export const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers: {
    superAdmin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.activeSidebar="superAdmin"
    },
    admin:(state)=>{
        state.activeSidebar="admin"
    },
    pcPm: (state) => {
        state.activeSidebar="pcpm"
    },
    teamLead: (state) => {
        state.activeSidebar="teamLead"
    },
    author: (state) => {
        state.activeSidebar="author"
      },
    reviewer: (state) => {
        state.activeSidebar="reviewer"
      },
     updateHeader: (state,action) => {
        state.headerTitle=action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { superAdmin,admin,pcPm,teamLead,user,updateHeader,author,reviewer } = appInfoSlice.actions

export default appInfoSlice.reducer