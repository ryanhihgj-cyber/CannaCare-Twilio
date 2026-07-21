const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const {
  processCallIntent
} = require("./aiProcessing");

router.post("/process", async (req, res) => {

  const speech =
    req.body.SpeechResult || "";

  console.log("Caller said:", speech);

  const aiResponse =
    await processCallIntent(speech);

  const twiml =
    new twilio.twiml.VoiceResponse();

  twiml.say(
    {
      voice: "Polly.Joanna"
    },
    aiResponse
  );

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

});

module.exports = router;
