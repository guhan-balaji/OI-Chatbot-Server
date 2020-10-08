const dialogflow = require("@google-cloud/dialogflow");

const projectId = process.env.PROJECT_ID;
const sessionId = "123456789";
const languageCode = "en-US";

const sessionClient = new dialogflow.SessionsClient();

// The path to identify the agent that owns the created intent.
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

exports.text_query_post = async (req, res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: languageCode,
      },
    },
  };
  try {
    const responses = await sessionClient.detectIntent(request);
    console.log("intent detected");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }

    const data = {
      intent: result.intent.displayName,
      value: result.fulfillmentText,
    };

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
