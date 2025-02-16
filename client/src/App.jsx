import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore ";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import TheHeader from "./components/TheHeader";
import Footer from "./components/Footer";

const App = () => {
  const { user, fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) return <div>loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <TheHeader /> {/* GitHub Icon now persists on all pages */}
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <SignUp />}
          />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};
export default App;
