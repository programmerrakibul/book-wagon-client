import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import AuthContext from "../contexts/AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInWithPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (info) => {
    console.log("From Update User ===> ", info);

    return updateProfile(auth.currentUser, info);
  };

  useEffect(() => {
    const onSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("tokenId", currentUser.accessToken);
      } else {
        setUser(null);
        localStorage.removeItem("tokenId");
      }

      setLoading(false);
    });

    return () => onSubscribe();
  }, []);

  const authData = {
    user,
    createUser,
    updateUserProfile,
    logInWithPassword,
    logOutUser,
    loginInWithGoogle,
  };
  return (
    <AuthContext value={authData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext>
  );
};

export default AuthProvider;
