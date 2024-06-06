'use client'
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

const NextLoginPage = () => {
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState(""); // State to hold input value

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (event) => {
    setApiKeyInput(event.target.value);
  };

  const saveApiKey = () => {
    // Update apiKey only if apiKeyInput is not empty
    if (apiKeyInput.trim() !== "") {
      setApiKey(apiKeyInput.trim());
      localStorage.setItem("openai_api_key", apiKeyInput.trim());
      setError("");
    } else {
      setError("Please enter a valid OpenAI API key.");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!apiKey) {
      setError("Please enter a valid OpenAI API key.");
      return;
    }

    const res = await signIn("google");
    if (res?.error) {
      setError("Failed to sign in with Google");
    }
    
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center">
        <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="mt-6">
            <label htmlFor="apiKey" className="block text-sm font-medium leading-6 text-gray-900">
              Please enter your OpenAI API key:
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKeyInput}
              onChange={handleApiKeyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button onClick={saveApiKey} className="mt-3 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save API Key
            </button>

            <button
              onClick={handleGoogleSignIn}
              
              className={`mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Continue with Google
            </button>
          </div>

          <p className="text-red-600 text-center text-[16px] my-4">
            {error && error}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextLoginPage;
