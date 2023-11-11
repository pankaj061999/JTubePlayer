import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import home from "./slices/home";
import layout from "./slices/layout";
import payment from "./slices/payment";
import player from "./slices/player";
import recommendation from "./slices/recommendation";
import user from "./slices/user";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["user", "community", "onBoarding"],
};

const layoutPersistConfig = {
  key: "layout",
  storage: storage,
};

const rootReducer = combineReducers({
  layout: persistReducer(layoutPersistConfig, layout),
  home,
  user,
  payment,
  player,
  recommendation,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
