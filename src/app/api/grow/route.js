import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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',dangerouslyAllowBrowser: true});

export async function classifyEmail(emailSnippet) {
  try {
    const chatCompletion = await getGroqChatCompletion(emailSnippet);
    const classification = chatCompletion.choices[0]?.message?.content || "Unknown";
    return classification;
  } catch (error) {
    console.error("Error classifying email:", error);
    return "Error";
  }
}
    
async function getGroqChatCompletion(emailSnippet) {
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

// Example usage:
async function main() {
  const emailSnippet = "This is a sample email snippet. It contains important information.";
  const classification = await classifyEmail(emailSnippet);
  console.log("Email Classification:", classification);
}

main();
