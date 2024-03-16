import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetch } from "../../../../shared/types";
import { ITokens } from "../../types";

const initialState: IFetch = {
  loading: false,
  data: { access: "", refresh: "" },
  error: "",
};

export const SignInFeaturesSlice = createSlice({
  name: "signInSlice",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },

    setData(state, action: PayloadAction<ITokens>) {
      state.loading = false;
      state.error = "";
      state.data = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setData, setError } = SignInFeaturesSlice.actions;

export default SignInFeaturesSlice.reducer;
