import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateRequest(prompt) {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,

    messages: [
      {
        role: "system",
        content: `
You are ForgeAI, an API request generation assistant.

Return ONLY valid JSON.

Schema:

{
  "method": "GET",
  "url": "",
  "headers": [
    {
      "key": "",
      "value": ""
    }
  ],
  "queryParams": [
    {
      "key": "",
      "value": ""
    }
  ],
  "body": null
}

Rules:
- No markdown.
- No explanation.
- No backticks.
- Always include every field.
- Headers must be an array of objects.
- Query parameters must be an array of objects.
- Body must be an object.
- For GET and DELETE requests, return an empty headers array unless the user explicitly requests authentication or custom headers.
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}