// utils/classifyEmails.js
import axios from "axios";

export const classifyEmails = async (snippets, apiKey) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/classifications",
      {
        model: "text-categorization", // Update to the correct model name if needed
        query: snippets,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error classifying emails:", error);
    throw error;
  }
};
