exports.handler = async function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();

    console.log("Incoming call:", JSON.stringify(event, null, 2));

    // Check if AI requested a transfer
    if (event.Memory) {
        try {
            const mem = JSON.parse(event.Memory);

            if (mem.tool === "transfer_to_budtender") {
                console.log("AI requested transfer");

                twiml.redirect(
                    `https://${context.DOMAIN}/voice-handoff`
                );

                return callback(null, twiml);
            }

        } catch (err) {
            console.log("Memory parse error:", err);
        }
    }

    // Open media stream to Render backend
    const connect = twiml.connect();

    connect.stream({
        url: `wss://${context.DOMAIN}/voice-stream`,
        track: "both"
    });

    return callback(null, twiml);
};
