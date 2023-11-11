import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentUrl: "",
  walletFund: "",
  totalPrice: "",
  nftTokens: "",
  openKyc: false,
  fantigerCoins: "",
  easebuzzRetryPaymentObj: {},
};

const payment = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPaymentUrl: (state, action) => {
      state.paymentUrl = action.payload;
    },
    setWalletFund: (state, action) => {
      state.walletFund = action.payload;
    },
    setFantigerCoins: (state, action) => {
      state.fantigerCoins = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setNftTokens: (state, action) => {
      state.nftTokens = action.payload;
    },
    setOpenKyc: (state, action) => {
      state.openKyc = action.payload;
    },
    setEasebuzzRetryPaymentObj: (state, action) => {
      state.easebuzzRetryPaymentObj = action.payload;
    },
  },
});

export const {
  setPaymentUrl,
  setWalletFund,
  setFantigerCoins,
  setTotalPrice,
  setNftTokens,
  setOpenKyc,
  setEasebuzzRetryPaymentObj,
} = payment.actions;

export default payment.reducer;
