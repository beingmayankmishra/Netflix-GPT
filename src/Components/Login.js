import React, { useRef, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, seterrormessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    seterrormessage(null);
    setSuccessMessage(null);

    if (message) {
      seterrormessage(message);
      return;
    }

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
  
          sendEmailVerification(user)
            .then(() => {
              setSuccessMessage("Verification email sent! Please check your inbox.");
            })
            .catch(() => {
              seterrormessage("Failed to send verification email. Please try again.");
            });

          fullName.current.value = "";
          email.current.value = "";
          password.current.value = "";
        })
        .catch((error) => {
          const errorMessage = error.message;
          seterrormessage(
            `Oops! Something went wrong. ${errorMessage.split(":")[1] || "Please try again."}`
          );
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          if (!user.emailVerified) {
            seterrormessage("Please verify your email before signing in.");
            return;
          }

          setSuccessMessage("Sign-in successful!");
           //
        })
        .catch((error) => {
          const errorMessage = error.message;
          seterrormessage(
            `Oops! Something went wrong. ${errorMessage.split(":")[1] || "Please try again."}`
          );
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    seterrormessage(null);
    setSuccessMessage(null);
    email.current.value = "";
    password.current.value = "";
    if (!isSignInForm) fullName.current.value = "";
  };

  return (
    <div className="relative h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src="/loginbanner.jpg"
          alt="Login banner"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 py-10 px-8 rounded-md w-[400px] shadow-lg"
      >
        <h1 className="font-bold text-3xl text-white mb-8">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-4 mb-6 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2 hover:border-white border-transparent border-2 transition"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 mb-6 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2 hover:border-white border-transparent border-2 transition"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 mb-8 w-full text-white rounded-md outline-none bg-gray-800 focus:ring-2 hover:border-white border-transparent border-2 transition"
        />
        {errormessage && (
          <p className="text-red-400 text-lg mb-4 bg-red-900 p-3 rounded-md shadow-md">
            {errormessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-400 text-lg mb-4 bg-green-900 p-3 rounded-md shadow-md">
            {successMessage}
          </p>
        )}
        <button
          onClick={handleButtonClick}
          className="bg-red-600 text-white font-semibold py-3 w-full rounded-md hover:bg-red-700 transition"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="text-center text-gray-400 mt-8">
          <p onClick={toggleSignInForm} className="text-gray-400 cursor-pointer">
            {isSignInForm ? (
              <span>
                New to Netflix? <span className="text-gray-300 font-bold">Sign up now.</span>
              </span>
            ) : (
              <span>
                Already Registered? <span className="text-gray-300 font-bold">Sign In Now</span>
              </span>
            )}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <Link to="#" className="text-blue-500 hover:underline">
            Learn more
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;