import { ErrorMessage, Field, Form, Formik } from "formik";
import SignUpEntities from "../../../../entities/AuthEntities/SignUpEntities/SignUpEntities";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IRegister } from "../model/types";
import eyeClosedIcon from "../../assets/eye-closed.svg";
import eyeOpenedIcon from "../../assets/eye-opened.svg";
import userIcon from "../../assets/user.svg";
import dogIcon from "../../assets/dog.svg";
import { SignUpAPI } from "../api/SignUpFeaturesAPI";
import { registerSchema } from "../model/validation";
import "./SignUpFeatures.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SignUpFeatures = () => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsregistered] = useState(false);

  const navigate = useNavigate();

  const { error } = useAppSelector((state) => state.signUpSlice);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const initialValues: IRegister = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: IRegister) => {
    console.log(values);

    dispatch(SignUpAPI(values, setIsregistered));
  };

  const handleButtonClick = (values: IRegister) => {
    handleSubmit(values);
  };

  if (isRegistered) {
    navigate("/verification");
  }

  return (
    <div className="signUp">
      <SignUpEntities />

      <div className="signUp__blockForm">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="signUp__form">
              <label className="signUp__form__label">
                <span className="signUp__form__label--name">Name</span>

                <Field
                  name="name"
                  placeholder="Enter your name"
                  className="signUp__form--inputs"
                />

                <img
                  className="signIn__form__label--icon"
                  src={userIcon}
                  alt="Eye"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <label className="signUp__form__label">
                <span className="signUp__form__label--name">Gmail</span>

                <Field
                  className="signUp__form--inputs"
                  name="email"
                  placeholder="Enter your Gmail"
                />

                <img
                  className="signIn__form__label--icon"
                  src={dogIcon}
                  alt="Eye"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <label className="signUp__form__label">
                <span className="signUp__form__label--name">Password</span>

                <Field
                  className="signUp__form--inputs"
                  name="password"
                  placeholder="Enter your Password"
                  type={showPassword ? "text" : "password"}
                />

                <img
                  className="signIn__form__label--icon"
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? eyeClosedIcon : eyeOpenedIcon}
                  alt="Eye"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <label className="signUp__form__label">
                <span className="signUp__form__label--name">Re-Passwod</span>

                <Field
                  className="signUp__form--inputs"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your Re-Passwod"
                />

                <img
                  className="signIn__form__label--icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  src={showConfirmPassword ? eyeClosedIcon : eyeOpenedIcon}
                  alt="Eye"
                />

                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="errorMessage"
                />
              </label>

              <button
                className={
                  values.email &&
                  values.name &&
                  values.password &&
                  values.confirmPassword
                    ? "signUp__form--fullBtn"
                    : "signUp__form--emptyBtn"
                }
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleButtonClick(values)}
              >
                Sign Up
              </button>

              <span className="signUp__form--span">
                Already have an account?
                <Link className="signUp__form--span--link" to={"/login"}>
                  Sign In Now
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpFeatures;
