import axios from "axios";
import { AppDispatch } from "../../../../app/rootStore";
import { setData, setError, setLoading } from "../model/SignInFeaturesSlice";
import { signInSchema } from "../model/validation";
import { ITokens } from "../../types";
import { baseAPI } from "../../../../shared/baseAPI";

export const SignInAPI =
  (
    data: {
      email: string;
      password: string;
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIslogined: Function
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await signInSchema.validate(data);

      const response = await axios.post<ITokens>(
        `${baseAPI}/api/auth/login`,
        data
      );

      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch(setData(response.data));

      setIslogined(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(setError(error.message));

      console.error("Error", error);
    }
  };
