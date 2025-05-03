import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";
import AuthModal from "./AuthModal";
import { useTheme } from "../utils/ThemeContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Auth = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error("Error signing out. Please try again.");
      console.error("Sign-out error:", error);
    }
  };

  return (
    <>
      {user ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className={`${theme === "light" ? "text-gray-800" : "text-white"}`}>
            {user.email}
          </span>
          <motion.button
            onClick={handleSignOut}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === "light"
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-red-900 text-red-100 hover:bg-red-800"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Sign out"
          >
            Sign Out
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className={`p-2 rounded-lg transition-all duration-300 ${
            theme === "light"
              ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
              : "bg-blue-900 text-blue-100 hover:bg-blue-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Sign in"
        >
          Sign In
        </motion.button>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Auth;