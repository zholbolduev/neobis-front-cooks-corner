import { ErrorMessage, Field, Form, Formik } from "formik";
import SignInEntities from "../../../../entities/AuthEntities/SignInEntities/SignInEntities";
import { signInSchema } from "../model/validation";
import { ILogin } from "../model/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { SignInAPI } from "../api/SignInFeaturesAPI";
import { useNavigate } from "react-router";
import eyeClosed from "../../assets/eyeClosed.svg";
import eyeOpened from "../../assets/eyeOpened.svg";
import "./SignInFeatures.scss";
import dogGmail from "../../assets/dog.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInFeatures = () => {
  const { error } = useAppSelector((state) => state.signInSlice);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [showPassword, setShowPassword] = useState(false);

  const [isLogined, setIslogined] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: ILogin) => {
    console.log(values);

    dispatch(SignInAPI(values, setIslogined));
  };

  if (isLogined) {
    navigate("/");
  }

  const handleButtonClick = (values: ILogin) => {
    handleSubmit(values);
  };

  return (
    <div className="signIn">
      <SignInEntities />

      <div className="signIn__blockForm">
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="signIn__form">
              <label className="signIn__form__label">
                <span className="signIn__form__label--name">Gmail</span>

                <Field
                  className="signIn__form--inputs"
                  name="email"
                  placeholder="Enter your Gmail"
                />

                <img
                  className="signIn__form__label--iconG"
                  src={dogGmail}
                  alt="Eye"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <label className="signIn__form__label">
                <span className="signIn__form__label--name">Password</span>

                <Field
                  className="signIn__form--inputs"
                  name="password"
                  placeholder="Enter your Password"
                  type={showPassword ? "text" : "password"}
                />

                <img
                  className="signIn__form__label--iconP"
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? eyeClosed : eyeOpened}
                  alt="Eye"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <button
                className={
                  values.email && values.password
                    ? "signIn__form--fullBtn"
                    : "signIn__form--emptyBtn"
                }
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleButtonClick(values)}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInFeatures;
