import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useTheme } from "../utils/ThemeContext";

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
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`p-2 border rounded-md ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-700 text-white"}`}
            aria-label="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`p-2 border rounded-md ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-700 text-white"}`}
            aria-label="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={`mt-4 ${theme === "light" ? "text-blue-500" : "text-blue-300"}`}
        >
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>
        <button
          onClick={onClose}
          className={`mt-4 p-2 border rounded-md ${theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-700 text-white hover:bg-gray-600"}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;