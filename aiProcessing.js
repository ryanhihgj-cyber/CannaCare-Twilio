const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function processCallIntent(text) {
  try {

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
You are a helpful phone assistant for Canna Care.

Answer questions about:
- Store hours
- Loyalty points
- Products
- Orders
- Promotions

Keep responses under 2 sentences because they will be spoken aloud.
`
          },
          {
            role: "user",
            content: text
          }
        ]
      });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error(error);

    return "I'm sorry, I am having trouble accessing the system right now.";
  }
}

module.exports = {
  processCallIntent
};
