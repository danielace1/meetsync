import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore ";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const App = () => {
  const { user, fetchUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) return <div>loading...</div>;

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <SignUp />} />

        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
