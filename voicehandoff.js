const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say(
    {
      voice: "Polly.Joanna"
    },
    "Please hold while I connect you with a team member."
  );

  twiml.dial(
    {
      answerOnBridge: true,
      callerId: process.env.TWILIO_NUMBER
    },
    process.env.STORE_PHONE
  );

  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
