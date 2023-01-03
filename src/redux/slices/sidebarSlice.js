import { createSlice } from '@reduxjs/toolkit'
import { adminLinks,superAdminLinks,pcPmLinks,teamLeadLinks,userLinks } from '../../components/Sidebar/SidebarLinks'
const initialState = {
  value:adminLinks
}

export const sidebarSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    superAdmin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value=superAdminLinks
    },
    admin:(state)=>{
        state.value=adminLinks
    },
    pcPm: (state) => {
        state.value=pcPmLinks
    },
    teamLead: (state) => {
        state.value=teamLeadLinks
    },
    user: (state) => {
        state.value=userLinks
      },
  },
})

// Action creators are generated for each case reducer function
export const { superAdmin,admin,pcPm,teamLead,user } = sidebarSlice.actions

export default sidebarSlice.reducer