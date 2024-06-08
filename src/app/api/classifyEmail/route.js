// import { Configuration, OpenAIApi } from "openai";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   const { apiKey, snippets } = req.body;

//   // Validate API key
//   if (!apiKey || typeof apiKey !== "string") {
//     return res.status(400).json({ error: "API key is required and must be a string" });
//   }

//   // Validate email snippets
//   if (!snippets || !Array.isArray(snippets) || snippets.length === 0) {
//     return res.status(400).json({ error: "Email snippets are required and must be a non-empty array" });
//   }

//   const configuration = new Configuration({
//     apiKey,
//   });

//   const openai = new OpenAIApi(configuration);

//   try {
//     const messages = snippets.map((snippet) => ({
//       role: "user",
//       content: `Classify the following email snippet into categories like important, spam, etc:\n\n"${snippet}"`,
//     }));

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo", // or gpt-4
//       messages: [
//         {
//           role: "system",
//           content: "You are an email classifier.",
//         },
//         ...messages,
//       ],
//       max_tokens: 150,
//     });

//     const classifications = response.data.choices.map((choice) => choice.message.content.trim());
//     res.status(200).json({ classifications });
//   } catch (error) {
//     console.error("Error classifying emails:", error.response ? error.response.data : error.message);
//     res.status(500).json({ error: "Error classifying emails" });
//   }
// }

// module.exports = { POST: handler };
