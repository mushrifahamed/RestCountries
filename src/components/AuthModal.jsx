import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useTheme } from "../utils/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const AuthModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!");
      }
      onClose();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`p-8 rounded-xl shadow-2xl w-full max-w-md ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full p-3 rounded-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gray-50 text-gray-800 border-gray-200 focus:border-blue-500"
                    : "bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                aria-label="Email"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full p-3 rounded-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-gray-50 text-gray-800 border-gray-200 focus:border-blue-500"
                    : "bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                aria-label="Password"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </motion.button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-sm ${
                theme === "light" ? "text-blue-600 hover:text-blue-700" : "text-blue-400 hover:text-blue-300"
              }`}
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;