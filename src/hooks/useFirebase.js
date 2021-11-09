import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";

initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = {email, displayName: name};
        console.log(newUser)
        setUser(newUser)
        //save user to the database
        saveUser(email, name, 'POST')
        // send name to firebase after creation
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
    const user = result.user;
    saveUser(user.email, user.displayName, 'PUT')
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

  useEffect(()=>{
    fetch(`http://localhost:5000/users/${user.email}`)
    .then(res => res.json())
    .then(data => setAdmin(data.admin))
  }, [user.email])

  // useEffect(()=>{
  //   fetch(`http://localhost:5000/users/${user.email}`)
  //   .then(res => res.json())
  //   .then(data => setAdmin(data.admin))
  // },[user.email])

  const logOut = () => {
    signOut(auth).then(() => {
      setUser({});
    }).catch((error) => {
      setError(error.message)
    });
  }

  const saveUser = (email, displayName, method) => {
      const user = {email, displayName};
      fetch('http://localhost:5000/users',{
        method: method,
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then()
  }

  return {
    registerUser,
    loginUser,
    logOut,
    signInWithGoogle,
    user,
    admin,
    error,
    isLoading,
    
  };
};

export default useFirebase;
