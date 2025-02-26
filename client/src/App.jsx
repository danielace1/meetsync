import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore ";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TheHeader from "./components/TheHeader";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { user, fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      <TheHeader />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};
export default App;
