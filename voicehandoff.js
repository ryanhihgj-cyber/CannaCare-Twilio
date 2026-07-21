exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();

    twiml.say(
        "Please hold while I connect you with a budtender."
    );

    twiml.dial(
        {
            answerOnBridge: true,
            callerId: "+19702485874"
        },
        "+19702485874"
    );

    callback(null, twiml);
};
