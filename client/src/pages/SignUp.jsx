import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/useAuthStore ";

const SignUp = () => {
  const { user, signup, loading } = useAuthStore();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-indigo-700 p-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-white/20">
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Join MeetSync 🚀
        </h2>
        <p className="text-gray-200 mb-6">
          Sign up with Google to get started!
        </p>

        <button
          onClick={signup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/30 transition-all duration-300 disabled:opacity-50 border border-white/40 cursor-pointer"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <>
              <FcGoogle size={25} className="bg-white rounded-full p-0.5" />{" "}
              Sign up with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default SignUp;
