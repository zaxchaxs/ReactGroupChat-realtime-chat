import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { useContext, createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    console.log(useContext(AuthContext));
    return useContext(AuthContext)
};

function authProvider() {
    
    const signInWithGoole = () => {
        
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithRedirect(auth, provider);

    }
};