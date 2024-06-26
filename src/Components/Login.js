import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidateData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [isSignIn, setisSignIn] = useState(true)

  const [errormessage,setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)


  const handleBtnClick = ()=>{
    // Validate the Form Data
    
    console.log(email.current.value)
    console.log(password.current.value)

    const message = checkValidateData(email.current.value, password.current.value)
    console.log(message)
    setErrorMessage(message)

    if(message) return;

    if(!isSignIn){
      // Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        // update

        updateProfile(auth.user, {
          displayName: name.current.value
        }).then(() => {
          // Profile updated!
          navigate("/browse")
        }).catch((error) => {
          // An error occurred
          setErrorMessage(error.message)
        });

        console.log(user)
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" +  errorMessage)
      });
    }
    else{
      // Sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage)
      });
    }

  }

  const toggleSignInForm =()=>{
    setisSignIn(!isSignIn)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="relative p-8 bg-black bg-opacity-75 max-w-md w-full flex flex-col mx-auto rounded">
          <h1 className="text-3xl font-semibold mb-6 text-white">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {
            !isSignIn && <input type="Name" placeholder="Username" className="p-4 mb-4
           bg-gray-800 text-white border border-gray-700 rounded focus:outline-none" />
          }
          <input ref={email}
          type="email" placeholder="Email" className="p-4 mb-4 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none" />
          <input ref={password}
          type="password" placeholder="Password" className="p-4 mb-4 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none" />
          <p className="text-red-600 font-semibold mb-4">{errormessage}</p>
          <button onClick={handleBtnClick}
          className="p-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">{isSignIn ? "Sign In" : "Sign up"}</button>
          <p onClick={toggleSignInForm}
            className='text-white font-semibold cursor-pointer mt-4 text-center'>{isSignIn ? "New to Netflix? Sign up now." : "Already registered? Sign In"} </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
