import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginStatus: false,
    loginId: null,
    loginName: '',
    loginRole: '',
    batchId: null,
    batchName: '',
    loginEmail:'',
    designation:''
  },
  reducers: {
    loginAction: (state,action)  => {
      state.loginStatus = true;
      state.loginId = action.payload.loginId;
      state.loginName = action.payload.loginName;
      state.loginRole = action.payload.loginRole;
      state.batchId = action.payload.batchId;
      state.batchName = action.payload.batchName;
      state.loginEmail=action.payload.loginEmail;
      state.designation=action.payload.designation;
    },
    logoutAction: (state) => {
      state.loginStatus = false
      state.loginId = null;
      state.loginName = '';
      state.loginRole = '';
      state.batchId = null;
      state.batchName = '';
      state.loginEmail ='';
      state.designation='';
    },
  },
})

export const { loginAction, logoutAction } = userSlice.actions
export default userSlice.reducer