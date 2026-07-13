import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/* ------------------------- */
/* ForgeAI Request Generator */
/* ------------------------- */

export async function generateRequest(prompt) {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,

    messages: [
      {
        role: "system",
        content: `
You are ForgeAI.

Your ONLY job is to convert natural language into an API request.

Return ONLY valid JSON.

Never return markdown.
Never return explanations.
Never return code blocks.
Never invent APIs.

Return this exact schema:

{
  "category":"",
  "intent":"",
  "method":"",
  "params":{},
  "confidence":0
}

Supported APIs:

- github
- weather
- crypto
- books
- universities
- jsonplaceholder

If the prompt doesn't match one of these APIs, return:

{
  "category":"unsupported",
  "intent":"",
  "method":"",
  "params":{},
  "confidence":0
}

Examples

GitHub user torvalds

{
"category":"github",
"intent":"user_info",
"method":"GET",
"params":{
"username":"torvalds"
},
"confidence":100
}

Weather in Chennai

{
"category":"weather",
"intent":"current_weather",
"method":"GET",
"params":{
"city":"Chennai"
},
"confidence":100
}

Bitcoin price

{
"category":"crypto",
"intent":"crypto_price",
"method":"GET",
"params":{
"coin":"bitcoin",
"currency":"usd"
},
"confidence":100
}

Atomic Habits

{
"category":"books",
"intent":"book_info",
"method":"GET",
"params":{
"title":"Atomic Habits"
},
"confidence":100
}

Universities in Germany

{
"category":"universities",
"intent":"university_search",
"method":"GET",
"params":{
"country":"Germany"
},
"confidence":100
}

Get all users

{
"category":"jsonplaceholder",
"intent":"users",
"method":"GET",
"params":{},
"confidence":100
}

Get post 10

{
"category":"jsonplaceholder",
"intent":"posts",
"method":"GET",
"params":{
"id":10
},
"confidence":100
}

Delete user 5

{
"category":"jsonplaceholder",
"intent":"users",
"method":"DELETE",
"params":{
"id":5
},
"confidence":100
}

Create user

{
"category":"jsonplaceholder",
"intent":"users",
"method":"POST",
"params":{},
"confidence":100
}
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

export async function explainResponse(request, response) {
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,

    messages: [
      {
        role: "system",
        content: `
You are ForgeAI.

Your job is to explain API responses for beginners in a concise and professional way.

Rules:

- Use simple English.
- Maximum 150 words.
- Maximum 2 short sentences per section.
- Never write long paragraphs.
- Never mention raw coordinates, IDs, timestamps, or internal values unless they are important.
- Focus on what a beginner should understand.
- If the request failed, explain the likely reason and how to fix it.
- If the request succeeded, explain what the API returned.
- Do not repeat the raw JSON.
- Do not use markdown symbols like ##, **, or backticks.

Output EXACTLY in this format:

Summary

Describe what data was returned.

Do NOT say:
"The API request was successful."

Instead, explain what was actually retrieved.

Examples:

Weather:
"Retrieved the current weather information for the requested location."

GitHub:
"Retrieved the public profile information for the requested GitHub user."

JSONPlaceholder:
"Retrieved the requested user record."

Books:
"Retrieved book search results matching the given title."

Status Code

Explain the status code in one short sentence only.

Important Fields

Mention ONLY the 3 most useful fields.
If the response contains an array or a large collection of objects, summarize the collection instead of describing every item. Focus on the overall purpose of the returned data.
Never explain metadata like:
- units
- generationtime
- timezone
- utc_offset
- elevation

Prefer actual response fields such as:
- id
- name
- title
- temperature
- windspeed
- current_weather
- followers
- public_repos
- login
- email

Errors
<If no errors, write "No errors detected.">
<Otherwise explain the error simply.>

Beginner Tip

Give ONE practical tip related to THIS API only.
Never give generic programming advice.
`,
      },
      {
        role: "user",
        content: JSON.stringify({
          request,
          response,
        }),
      },
    ],
  });

  return completion.choices[0].message.content;
}