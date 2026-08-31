const express = require("express");
const http = require("http");
require("dotenv").config();

const voiceLogic = require("./voicelogic");
const voiceHandoff = require("./voicehandoff");
const initializeVoiceServer = require("./voice-stream");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/voice", voiceLogic);
app.use("/voice-handoff", voiceHandoff);

app.get("/", (req, res) => {
  res.send("Canna Care AI Assistant Online");
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeVoiceServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
