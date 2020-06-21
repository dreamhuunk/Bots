const response = require("../utils/response");
const axios = require('axios');
const MessageService = require('../services/MessageService');

exports.verifyHook = async function (req,res,next) {


    // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  console.log(VERIFY_TOKEN);
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
       //response.responseWriter(res,200,challenge);
       res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
};



exports.processWebhook = async function (req,res,next) {

  // Parse the request body from the POST
  let body = req.body;


  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach( async (entry) =>{

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0

      
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      let message = webhook_event.message;

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;

      await MessageService.handleMessage(sender_psid,message);
 
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};