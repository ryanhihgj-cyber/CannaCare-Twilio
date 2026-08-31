const express = require("express");
2
const router = express.Router();
3
const twilio = require("twilio");
4
 
5
router.post("/", (req, res) => {
6
const twiml = new twilio.twiml.VoiceResponse();
7
 
8
const connect = twiml.connect();
9
 
10
connect.stream({
11
url: `wss://${process.env.DOMAIN}/voice-stream`
12
});
13
 
14
res.type("text/xml");
15
res.send(twiml.toString());
16
});
17
 
18
module.exports = router;
