import React from "react";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

const AuthPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 m-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-4 tracking-wide">
          Sign Up
        </h2>
        <p className="text-sm lg:text-base font-light text-gray-600 text-center mb-6">
          Create an account to manage your cars effortlessly.
        </p>
        <SignupPage />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 m-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-4 tracking-wide">
          Login
        </h2>
        <p className="text-sm lg:text-base font-light text-gray-600 text-center mb-6">
          Welcome back! Please log in to access your account.
        </p>
        <LoginPage />
      </div>
    </div>
  );
};

export default AuthPage;
