import Groq from "groq-sdk";

export async function classifyEmail(emailSnippet, apiKey) {
  try {
    const chatCompletion = await getSambaChatCompletion(emailSnippet, apiKey);
    const classification = chatCompletion.choices[0]?.message?.content || "Unknown";
    return classification;
  } catch (error) {
    console.error("Error classifying email:", error);
    return "Error";
  }
}

async function getSambaChatCompletion(emailSnippet, apiKey) {
  const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "Meta-Llama-3.2-8B", // Use the appropriate model available in SambaNova
      messages: [
        {
          role: "user",
          content: `Classify the following email snippet:\n\n"${emailSnippet}". Please provide a one-word classification for this email snippet. Include only one word in your response, no extra words.

Example Classifications:
- Important: Emails that are personal or work-related and require immediate attention.
- Promotions: Emails related to sales, discounts, and marketing campaigns.
- Social: Emails from social networks, friends, and family.
- Marketing: Emails related to marketing, newsletters, and notifications.
- Spam: Unwanted or unsolicited emails.
- General: If none of the above are matched, use General.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Error connecting to SambaNova API");
  }

  return await response.json();
}

