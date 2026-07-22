const express = require("express");
require("dotenv").config();

const voiceRouter = require("./voicerouter");
const speechProcess = require("./speechProcess");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/voice", voiceRouter);
app.use("/voice", speechProcess);

app.get("/", (req, res) => {
  res.send("Canna Care AI Phone Assistant Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
