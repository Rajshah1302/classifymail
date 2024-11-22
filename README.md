
# Classify Emails

Classify Emails is a cutting-edge application that automates the organization of Gmail inboxes using advanced AI. By leveraging secure Google OAuth authentication, it fetches raw email data via the Gmail API and utilizes the SambaNova Fast API to classify emails into categories like Promotions, Social, Updates, and Forums. This intelligent classification system streamlines email management, helping users quickly identify and prioritize important messages. The app's user-friendly interface allows for easy viewing, searching, and filtering of categorized emails, enhancing productivity and reducing the time spent on inbox maintenance. With its robust security and efficient email organization, Classify Emails is an essential tool for maintaining a clutter-free and manageable inbox.

[![Classify Emails Screenshot](https://github.com/user-attachments/assets/a274bbc4-9821-447c-8d83-04c36ff7c850)](https://github.com/user-attachments/assets/a274bbc4-9821-447c-8d83-04c36ff7c850)

## Future of the App
- **AI-Generated Email Responses**: For each email, when opened, AI will generate a ready-to-send draft response, saving time and enhancing productivity.
- **Google API Integration**: We will incorporate various Google APIs to create a seamless ecosystem for managing emails, calendar, contacts, and more, all within one AI-powered platform.
- **Advanced AI Models**: We will continue to integrate cutting-edge AI models for even more precise and context-aware email classifications.
- **Real-Time Email Updates**: The app will offer real-time classification and organization of incoming emails.
- **Personalized Email Management**: Intelligent sorting and categorization based on user preferences for a tailored inbox experience.

These innovations will make **Classify Emails** a comprehensive, intelligent assistant for managing and automating all your communication needs in a unified system.

## Code Implementation

```javascript
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
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Rajshah1302/classifymail.git
cd classify-emails
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:

Create a `.env` file in the app folder of your project and add the following:

```env
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
SAMBANOVA_API_KEY=your-sambanova-api-key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Links

- **Home Page**: [https://classifymail-2.onrender.com](https://classifymail-2.onrender.com)

---

Let me know if you need further modifications!
