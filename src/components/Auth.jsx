import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-4">
      {user ? (
        <button onClick={handleSignOut} className="p-2 border rounded-md dark:bg-gray-800 dark:text-white">
          Sign Out
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <button onClick={handleSignIn} className="p-2 bg-blue-500 text-white rounded-md">
            Sign In
          </button>
          <button onClick={handleSignUp} className="p-2 bg-green-500 text-white rounded-md">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;