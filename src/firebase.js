// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export const Authentication = () => {
  const [user] = useAuthState(auth);
  
  const googleHandlerLogin = async () => {
    return await signInWithRedirect(auth, provider)
  };

  const logoutHandler = () =>{
    try {
      signOut(auth);
    } catch(err) {
      console.log(err.message)
    }
  }

  const method = {
    user,
    db, 
    auth,
    googleHandlerLogin,
    logoutHandler,
  };
  return method;
}
