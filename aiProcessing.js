const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Processes caller speech and returns AI response
 * @param {string} text
 * @returns {Promise<string>}
 */
async function processCallIntent(text) {
  try {

    const userInput = (text || "").trim();

    // Human transfer requests
    const transferKeywords = [
      "budtender",
      "human",
      "person",
      "representative",
      "agent",
      "employee",
      "store",
      "transfer",
      "manager"
    ];

    const wantsTransfer = transferKeywords.some(keyword =>
      userInput.toLowerCase().includes(keyword)
    );

    if (wantsTransfer) {
      return "TRANSFER_TO_BUDTENDER";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.4,
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content: `
You are the official phone assistant for Canna Care.

Rules:
- Keep responses short and natural.
- Responses should usually be 1-2 sentences.
- You are speaking over the phone.
- Do not use bullet points.
- Do not use markdown.
- Do not make up inventory, pricing, loyalty points, or order status.
- If information is unavailable, politely explain that a budtender can assist.
- If the caller requests a human or budtender, respond only with:
TRANSFER_TO_BUDTENDER

You can answer general questions about:
- Store hours
- Locations
- Promotions
- Cannabis products
- General dispensary questions
- Canna Care services
`
        },
        {
          role: "user",
          content: userInput
        }
      ]
    });

    return completion.choices[0].message.content;

  } catch (error) {

    console.error("OpenAI Error:", error);

    return "I'm sorry, I'm having trouble accessing my system right now. Please try again or ask to speak with a budtender.";

  }
}

module.exports = {
  processCallIntent
};
