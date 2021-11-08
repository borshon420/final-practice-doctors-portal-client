import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = {email, displayName: name};
        console.log(newUser)
        setUser(newUser)
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          
        }).catch((error) => {
          setError(error.message)
        });
        history.replace('/')
      })
      .catch((error) => {
        setError(error.message);
      })
      
      .finally(()=> setIsLoading(false));
  };

  const loginUser = (email, password, location, history) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    const destination = location?.state?.from || '/';
    history.replace(destination)
    const user = result.user;
    setUser(user);
  })
  .catch((error) => {
    setError(error.message);
  })
  .finally(()=> setIsLoading(false));
  }

  const signInWithGoogle = (location, history) => {
    setIsLoading(true)
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    const destination = location?.state?.from || '/';
    history.replace(destination)
  })
  .catch((error) => {
    setError(error.message);
  })
  .finally(()=> setIsLoading(false));
  }

  useEffect(()=>{
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        
      }
      setIsLoading(false);
    });
    return ()=> unsubscribed;
  },[])

  const logOut = () => {
    signOut(auth).then(() => {
      setUser({});
    }).catch((error) => {
      setError(error.message)
    });
  }
  return {
    registerUser,
    loginUser,
    logOut,
    signInWithGoogle,
    user,
    error,
    isLoading,
    
  };
};

export default useFirebase;
