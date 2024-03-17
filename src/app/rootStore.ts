import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import signInReducer from "../features/AuthFeatures/SignInFeatures/model/SignInFeaturesSlice";
import signUpReducer from "../features/AuthFeatures/SignUpFeatures/model/SignUpFeaturesSlice";

const rootReducers = combineReducers({
  signInSlice: signInReducer,
  signUpSlice: signUpReducer,
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
