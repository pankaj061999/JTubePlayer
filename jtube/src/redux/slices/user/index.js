import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userData: null,
  profile: {
    email: null,
    name: null,
    profilePic: null,
    id: null,
    mobile: null,
    referralId: {},
  },
  id: null,
  languagePrefNameObj: [],
  artistID: null,
  creatorID: null,
  creatorInfo: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLoggedIn = payload.isLoggedIn;
    },
    setUserDetail: (state, { payload }) => {
      state.profile.email = payload.email;
      state.profile.name = payload.name;
      state.profile.profilePic = payload.profilePic;
      state.profile.id = payload.id;
      state.profile.mobile = payload.mobile;
      state.id = payload.id;
      state.profile.referralId = payload.referralId;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLanguagePrefNameObj: (state, action) => {
      state.languagePrefNameObj = action.payload;
    },
    setArtistID: (state, action) => {
      state.artistID = action.payload;
    },
    setCreatorID: (state, action) => {
      state.creatorID = action.payload;
    },
    setCreatorInfo: (state, action) => {
      state.creatorInfo = action.payload;
    },
  },
});

export const {
  setToken,
  setUserDetail,
  setUserData,
  setLanguagePrefNameObj,
  setArtistID,
  setCreatorID,
  setCreatorInfo,
} = user.actions;

export default user.reducer;
