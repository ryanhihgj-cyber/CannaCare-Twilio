const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {

  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say(
    {
      voice: "Polly.Joanna"
    },
    "Please hold while I connect you with a budtender."
  );

  twiml.dial(
    {
      answerOnBridge: true,
      callerId: "+19702485874"
    },
    "+19702485874"
  );

  res.type("text/xml");
  res.send(twiml.toString());

});

module.exports = router;
