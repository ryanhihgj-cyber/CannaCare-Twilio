const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function processCallIntent(text) {

  const completion =
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a phone assistant for Canna Care."
          },
          {
            role: "user",
            content: text
          }
        ]
      });

  return completion.choices[0].message.content;
}
