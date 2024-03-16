import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile-page" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/register" element={<SignUpPage />} />

      <Route path="/login" element={<SignInPage />} />

      <Route path="/forgot-password-page" element />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;