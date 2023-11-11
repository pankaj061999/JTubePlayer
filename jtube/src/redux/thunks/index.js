import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOnboardingDataInCookies } from "src/services/home/onBoarding";

export const setOnBoardingAsyncData = createAsyncThunk(
  "setOnboardingData",
  setOnboardingDataInCookies
);
