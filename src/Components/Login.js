import React, { useRef, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    // Validate data before proceeding
    const message = checkValidData(email.current.value, password.current.value);
    seterrormessage(null); // Clear previous error message
    setSuccessMessage(null); // Clear previous success message

    if (message) {
      seterrormessage(message); // Set error message if validation fails
      return; // Stop further processing if validation fails
    }

    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          setSuccessMessage("Your account has been created successfully!");
          fullName.current.value = "";
          email.current.value = "";
          password.current.value = "";
        })
        .catch((error) => {
          const errorMessage = error.message;
          seterrormessage(`Oops! Something went wrong. ${errorMessage.split(":")[1] || "Please try again."}`);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorMessage = error.message;
          seterrormessage(`Oops! Something went wrong. ${errorMessage.split(":")[1] || "Please try again."}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    seterrormessage(null); // Clear error message when switching forms
    setSuccessMessage(null); // Clear success message when switching forms
    email.current.value = ""; // Clear email field when switching
    password.current.value = ""; // Clear password field when switching
    if (!isSignInForm) fullName.current.value = ""; // Clear full name field if switching to Sign In form
  };

  return (
    <div className="relative h-screen">
      <Header />
      {/* Background Banner */}
      <div className="absolute inset-0">
        <img
          src="/loginbanner.jpg"
          alt="Login banner"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* Login Form / signup */}
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

        {/* Error and Success Messages */}
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

        <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
        </div>

        <div className="text-gray-400 text-sm mt-8 text-center">
          <p
            onClick={toggleSignInForm}
            className="text-white font-bold cursor-pointer"
          >
            {isSignInForm ? (
              <>
                <span className="text-gray-400">New to Netflix?</span>{" "}
                <span className="font-bold">Sign up now.</span>
              </>
            ) : (
              <>
                <span className="text-gray-400">Already Registered?</span>{" "}
                <span className="font-bold">Sign In Now</span>
              </>
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
