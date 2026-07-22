const express = require("express");
const router = express.Router();
const twilio = require("twilio");

router.post("/", (req, res) => {

  const twiml = new twilio.twiml.VoiceResponse();

  const connect = twiml.connect();

  connect.stream({
    url: `wss://${process.env.DOMAIN}/voice-stream`,
    track: "both"
  });

  res.type("text/xml");
  res.send(twiml.toString());

});

module.exports = router;
