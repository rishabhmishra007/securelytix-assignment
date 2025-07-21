import { Navigate, Route, Routes } from "react-router-dom";
import DarkVeil from "./components/DarkVeil";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

//protected routes that req auth
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

//redirect users to dashboard page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-[100vw] flex items-center justify-center relative overflow-hidden">
      <DarkVeil aria-hidden="true" />
      <div className="absolute z-10 flex flex-col items-center justify-center gap-4">
        <img src="./logo.svg" alt="logo" className="h-[5vh]" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerification />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          {/* catch route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
