import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";
import AuthModal from "./AuthModal";
import { useTheme } from "../utils/ThemeContext";

const Auth = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-4">
          <span className={`${theme === "light" ? "text-gray-800" : "text-white"}`}>{user.email}</span>
          <button
            onClick={handleSignOut}
            className={`p-2 border rounded-md ${
              theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className={`p-2 border rounded-md ${
            theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          aria-label="Sign in"
        >
          Sign In
        </button>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Auth;