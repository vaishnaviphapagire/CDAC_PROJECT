import { createSlice } from '@reduxjs/toolkit';
import userSignIn from '../Images/User.png';
const imageSlice = createSlice({
  name: 'image',
  initialState: {
    userImage: userSignIn
  },
  reducers: {
    loginImage: (state, action) => {
      state.userImage = action.payload.userImage;
    },
    logoutImage: (state) => {
      state.userImage = '';
    },
  },
});

export const { loginImage, logoutImage } = imageSlice.actions;
export default imageSlice.reducer;