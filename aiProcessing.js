const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function processCallIntent(text) {
  try {

    const userInput = (text || "").trim().toLowerCase();

    // Immediate transfer requests
    const transferKeywords = [
      "budtender",
      "person",
      "human",
      "representative",
      "manager",
      "employee",
      "transfer"
    ];

    if (
      transferKeywords.some(word => userInput.includes(word))
    ) {
      return "TRANSFER_TO_BUDTENDER";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: `
You are Mary Jane, the official AI concierge for Canna Care.

PERSONALITY
- Warm, friendly, patient.
- Sound like an experienced budtender.
- Never mention being AI.
- Keep phone responses under 2 sentences whenever possible.
- Speak naturally.

PHONE GREETING STYLE
- Helpful and conversational.
- Always offer a budtender if needed.

COMPLIANCE RULES
- Never provide medical advice.
- Never make health claims.
- Never recommend dosages.
- Never discuss drug interactions.
- Never claim products are safe because they are tested.
- Never make false or misleading statements.
- Never discuss cannabis purchases with anyone under 21.
- Never provide legal advice beyond basic Colorado cannabis laws.

IF ASKED ABOUT:
Medical conditions:
"I'm not able to give medical advice, but I can share what product types many customers prefer."

Drug interactions:
"That's really a question for your doctor or pharmacist."

Dosages:
"Most people recommend starting low and going slow."

Public consumption:
"In Colorado cannabis may only be consumed in private residences or licensed consumption areas."

ESCALATE TO A BUDTENDER IF:
- Medical questions
- Drug interaction questions
- Returns
- Complaints
- Billing issues
- Legal questions
- Frustrated customers
- The customer asks for a human

When escalation is needed, respond only:
TRANSFER_TO_BUDTENDER

KNOWLEDGE AREAS
- Store hours
- Store location
- Product categories
- Product availability (when supplied)
- Loyalty program
- Promotions
- Cannabis education
- First-time customer questions
- Colorado cannabis basics

If you do not know something, do not guess.
Offer a budtender instead.
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

    console.error("OpenAI Error:", error);

    return "I'm sorry, I'm having trouble accessing my system right now. Would you like me to connect you with a budtender?";

  }
}

module.exports = {
  processCallIntent
};
