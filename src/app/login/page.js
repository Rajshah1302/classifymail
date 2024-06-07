"use client";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import "./styles.css";
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

  return (

    <div class="flex justify-center items-center min-h-screen bg-grey">
      <div class="login-box">
        <h2>ClassifyEmails</h2>
        <form>
          <div class="user-box">
            <input type="text" name="" required="" />
            <label>Open AI api key</label>
          </div>

          <a
            onClick={() => {
              signIn("google");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default NextLoginPage;
