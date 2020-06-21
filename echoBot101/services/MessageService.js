const RequestService = require("../services/RequestService");

module.exports.handleMessage = async function (senderPSID,receivedMessage) {


    let response;

    // Checks if the message contains text
    if (receivedMessage.text) {
      
      // Creates the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        "text": `You sent the message: ${receivedMessage.text}`
      };
  
    } else if (receivedMessage.attachments) {
    
      // Gets the URL of the message attachment
      let attachment_url = receivedMessage.attachments[0].payload.url;
    
    } 
    
    // Sends the response message
    await RequestService(senderPSID,response);

};


module.exports.handleMessagePostBack = async function (senderPSID,receivedMessagePostBack) {

};
