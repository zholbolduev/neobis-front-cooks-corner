import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import signInreducer from "../features/AuthFeatures/SignInFeatures/model/SignInFeaturesSlice";

const rootReducers = combineReducers({
  signInSlice: signInreducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
