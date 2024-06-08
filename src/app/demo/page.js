// pages/classify-emails.js
'use client'
import { useState } from "react";
import { classifyEmail } from "../api/grow/route";
export default function ClassifyEmailsPage() {
  const [emailSnippet, setEmailSnippet] = useState("");
  const [classification, setClassification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClassifyClick = async () => {
    setIsLoading(true);
    try {
      const result = await classifyEmail(emailSnippet);
      setClassification(result);
    } catch (error) {
      console.error("Error classifying email:", error);
      setClassification("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Email Classification Demo</h1>
      <div>
        <label htmlFor="emailSnippet">Email Snippet:</label>
        <textarea
          id="emailSnippet"
          value={emailSnippet}
          onChange={(e) => setEmailSnippet(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleClassifyClick} disabled={isLoading}>
        {isLoading ? "Classifying..." : "Classify"}
      </button>
      <div>
        <h2>Classification Result:</h2>
        <p>{classification || "No classification yet"}</p>
      </div>
    </div>
  );
}
