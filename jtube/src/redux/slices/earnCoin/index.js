import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coinBonus: {},
  userLevelLimitBonus: {},
};

const earnCoin = createSlice({
  name: "earnCoin",
  initialState,
  reducers: {
    setCoinBonus: (state, action) => {
      state.coinBonus = action.payload;
    },
    setUserLevelLimitBonus: (state, action) => {
      state.userLevelLimitBonus = action.payload;
    },
  },
});

export const { setCoinBonus, setUserLevelLimitBonus } = earnCoin.actions;

export default earnCoin.reducer;
