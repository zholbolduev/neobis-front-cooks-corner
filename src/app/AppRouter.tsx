import { Route, Routes } from "react-router";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import VerificationPage from "../pages/VerificationPage/VerificationPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/register" element={<SignUpPage />} />

      <Route path="/verification" element={<VerificationPage />} />

      <Route path="/login" element={<SignInPage />} />

      <Route path="/forgot-password-page" element />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
