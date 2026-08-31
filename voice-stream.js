const WebSocket = require("ws");

function initializeVoiceServer(server) {
  const wss = new WebSocket.Server({
    server,
    path: "/voice-stream"
  });

  wss.on("connection", (ws) => {
    console.log("Twilio Media Stream Connected");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        console.log("Twilio Event:", data.event);

        if (data.event === "start") {
          console.log("Call Started");
        }

        if (data.event === "stop") {
          console.log("Call Ended");
        }
      } catch (err) {
        console.error("Voice Stream Error:", err);
      }
    });

    ws.on("close", () => {
      console.log("Twilio Stream Closed");
    });
  });
}

module.exports = initializeVoiceServer;
