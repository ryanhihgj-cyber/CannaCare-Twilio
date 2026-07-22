const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const {
  processCallIntent
} = require("./aiProcessing");

router.post("/process", async (req, res) => {
  try {

    const speech = req.body.SpeechResult || "";

    console.log("Caller said:", speech);

    const aiResponse = await processCallIntent(speech);

    const twiml = new twilio.twiml.VoiceResponse();

    // Transfer to live budtender
    if (aiResponse === "TRANSFER_TO_BUDTENDER") {

      twiml.say(
        {
          voice: "Polly.Joanna"
        },
        "Please hold while I connect you with a budtender."
      );

      twiml.redirect("/voice-handoff");

      res.type("text/xml");
      return res.send(twiml.toString());
    }

    // Normal AI response
    twiml.say(
      {
        voice: "Polly.Joanna"
      },
      aiResponse
    );

    // Continue conversation
    const gather = twiml.gather({
      input: "speech",
      speechTimeout: "auto",
      action: "/voice/process",
      method: "POST"
    });

    gather.say(
      {
        voice: "Polly.Joanna"
      },
      "Do you need anything else?"
    );

    res.type("text/xml");
    res.send(twiml.toString());

  } catch (error) {

    console.error("Speech Process Error:", error);

    const twiml = new twilio.twiml.VoiceResponse();

    twiml.say(
      {
        voice: "Polly.Joanna"
      },
      "I'm sorry, there was an error processing your request. Please try again."
    );

    res.type("text/xml");
    res.send(twiml.toString());
  }
});

module.exports = router;
