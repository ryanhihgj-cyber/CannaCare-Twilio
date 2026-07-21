const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", async (req, res) => {

  const twiml = new twilio.twiml.VoiceResponse();

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
    "Welcome to Canna Care. How can I help you today?"
  );

  res.type("text/xml");
  res.send(twiml.toString());

});
