import { Route, Routes } from "react-router";
import SignInFeatures from "../features/AuthFeatures/SignInFeatures/ui/SignInFeatures";
// import AppLayout from "./AppLayout";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route element={<AppLayout />}> */}
      {/* <Route index element={<HomePage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      {/* </Route> */}

      <Route path="/" element={<SignInFeatures />} />

      {/* <Route path="/register-page" element={<RegisterPage />} />

      <Route path="/login-page" element={<LoginPage />} />

      <Route path="/forgot-password-page" element={<ForgotPasswordPage />} />

      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
