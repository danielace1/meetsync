import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/useAuthStore ";

const SignUp = () => {
  const { user, signup, loading } = useAuthStore();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 blur-2xl opacity-20"></div>

      <div className="relative bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center border border-white/30 transition-all hover:shadow-[0px_0px_30px_rgba(255,255,255,0.2)]">
        <h3 className="text-white text-lg font-medium tracking-wide uppercase mb-2 opacity-80">
          Sync Smarter, Meet Better 🚀
        </h3>

        <h2 className="text-4xl font-bold text-white drop-shadow-md mb-4">
          Welcome to MeetSync
        </h2>

        <p className="text-gray-300 mb-6 text-sm">
          MeetSync helps you create and manage meetings effortlessly with Google
          Calendar. Sync schedules, generate Google Meet links, and stay
          organized—all in one place.
        </p>

        <button
          onClick={signup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white/20 text-white font-semibold py-3 px-6 rounded-lg border border-white/40 transition-all duration-300 disabled:opacity-50  cursor-pointer
        hover:bg-white/30 hover:scale-100 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.4)]"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <>
              <FcGoogle size={25} className="bg-white rounded-full p-0.5" />
              Sign up with Google
            </>
          )}
        </button>

        {/* Subtle animated wave at the bottom */}
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-white/20 rounded-full blur-md opacity-50"></div>
      </div>
    </div>
  );
};
export default SignUp;
