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
twiml.say(
9
{
10
voice: "Polly.Joanna"
11
},
12
"Please hold while I connect you with a team member."
13
);
14
 
15
twiml.dial(
16
{
17
answerOnBridge: true,
18
callerId: process.env.TWILIO_NUMBER
19
},
20
process.env.STORE_PHONE
21
);
22
 
23
res.type("text/xml");
24
res.send(twiml.toString());
25
});
26
 
27
module.exports = router;
