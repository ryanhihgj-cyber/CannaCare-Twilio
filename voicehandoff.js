exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();

    console.log("Executing voice-handoff → Connecting caller to store");

    twiml.pause({ length: 1 });

    twiml.dial(
        {
            answerOnBridge: true,
            callerId: "+19702485874"
        },
        "+19702485874"
    );

    return callback(null, twiml);
};
