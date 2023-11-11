import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selEntityCategoryId: "",
  excludeEntityIds: [],
  selectedLanguage: "",
  recommendedCategoryId: "",
};

const recommendation = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setSelectedEntityCatId: (state, action) => {
      state.selEntityCategoryId = action.payload;
    },
    addToExcludeEntityIds: (state, action) => {
      const items = new Set([...state.excludeEntityIds, ...action.payload]);
      state.excludeEntityIds = [...items];
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setRecommendationCategoryId: (state, action) => {
      state.recommendedCategoryId = action.payload;
    },
  },
});

export const {
  setSelectedEntityCatId,
  addToExcludeEntityIds,
  setSelectedLanguage,
  setRecommendationCategoryId,
} = recommendation.actions;

export default recommendation.reducer;
