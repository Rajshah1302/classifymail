import Groq from "groq-sdk";

export async function classifyEmail(emailSnippet, apiKey) {
  try {
    const chatCompletion = await getGroqChatCompletion(emailSnippet, apiKey);
    const classification = chatCompletion.choices[0]?.message?.content || "Unknown";
    return classification;
  } catch (error) {
    console.error("Error classifying email:", error);
    return "Error";
  }
}

async function getGroqChatCompletion(emailSnippet, apiKey) {
  const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Classify the following email snippet:\n\n"${emailSnippet},Please provide a one-word classification for this email snippet. Include only one word in your response, no extra words.

Example Classifications:
- Important: Emails that are personal or work-related and require immediate attention.
- Promotions: Emails related to sales, discounts, and marketing campaigns.
- Social: Emails from social networks, friends, and family.
- Marketing: Emails related to marketing, newsletters, and notifications.
- Spam: Unwanted or unsolicited emails.
- General: If none of the above are matched, use General `
      },
    ],
    model: "llama3-8b-8192",
  });
}

