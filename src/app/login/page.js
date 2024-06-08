"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import "./styles.css";
import { redirect } from "next/navigation";

const NextLoginPage = () => {
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState(""); // State to hold input value

  const { data: session } = useSession();

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    // Redirect the user if session exists
    if (session) {
      redirect("/temp");
    }
  }, [session]);

  const handleApiKeyChange = (event) => {
    setApiKeyInput(event.target.value);
  };

  const saveApiKey = () => {
    // Update apiKey only if apiKeyInput is not empty
    if (apiKeyInput.trim() !== "") {
      setApiKey(apiKeyInput.trim());
      localStorage.setItem("groq_api_key", apiKeyInput);
      setError("");
    } else {
      setError("Please enter a valid Groq API key.");
    }
  };

  const login = () => {
    if (apiKey) saveApiKey();
    signIn("google");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey">
      <div class="login-container">
        <h1>Login</h1>
        <div id="loginForm">
          <div class="input-group">
            <label for="username">Groq API key</label>
            <input
              type="text"
              id="username"
              name="username"
              value={apiKeyInput}
              onChange={handleApiKeyChange}
            />
          </div>

          <button onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextLoginPage;
