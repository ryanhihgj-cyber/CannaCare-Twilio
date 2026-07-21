require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const voiceRoute = require("./routes/voice");

app.use("/voice", voiceRoute);

app.get("/", (req, res) => {
  res.send("Canna Care AI Phone Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
