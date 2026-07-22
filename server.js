const express = require("express");

const voiceRouter = require("./voicerouter");
const speechProcess = require("./speechProcess");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/voice", voiceRouter);
app.use("/voice", speechProcess);

app.get("/", (req, res) => {
  res.send("Canna Care Voice AI Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
