import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokens } from "../../types";
import { IFetch } from "../../../../shared/types";

const initialState: IFetch = {
  loading: false,
  data: { access: "", refresh: "" },
  error: "",
};

export const SignUpFeaturesSlice = createSlice({
  name: "signUpSlice",
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

export const { setData, setError, setLoading } = SignUpFeaturesSlice.actions;

export default SignUpFeaturesSlice.reducer;
