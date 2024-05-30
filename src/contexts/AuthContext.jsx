/* eslint-disable react/prop-types */
import { signInWithRedirect, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, githubProvider, googleProvider } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  const loginWithGoogleHandler = async () => {
    return await signInWithRedirect(auth, googleProvider);
  };

  const loginWithGithubHandler = async () => {
    return await signInWithRedirect(auth, githubProvider);
  };

  const logoutHandler = () => {
    try {
      setLoading(true);
      signOut(auth);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  const authContextValue = {
    user,
    loginWithGoogleHandler,
    loginWithGithubHandler,
    logoutHandler,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
