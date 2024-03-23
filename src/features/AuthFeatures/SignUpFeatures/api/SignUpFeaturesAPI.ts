import axios from "axios";
import { AppDispatch } from "../../../../app/rootStore";
import { setData, setError, setLoading } from "../model/SignUpFeaturesSlice";
import { baseAPI } from "../../../../shared/baseAPI";
import { registerSchema } from "../model/validation";

export const SignUpAPI =
  (
    data: {
      email: string;
      name: string;
      password: string;
      confirmPassword: string;
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    setIsRegisted: Function
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      await registerSchema.validate(data);

      const response = await axios.post(`${baseAPI}/api/auth/register`, data);

      console.log(response.data);

      dispatch(setData(response.data));

      setIsRegisted(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      dispatch(setError(error));
    }
  };
