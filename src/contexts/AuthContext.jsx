/* eslint-disable react/prop-types */
import { signInWithRedirect, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, githubProvider, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginWithGoogleHandler = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  
  const loginWithGithubHandler = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, githubProvider);
    } catch (e) {
      alert(e.message);
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    try {
      setLoading(true);
      signOut(auth);
      navigate("/");
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
