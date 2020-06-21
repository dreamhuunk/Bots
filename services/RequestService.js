const axios = require('axios');
const Request = require('../config/request_config');


module.exports = async function sendMsgToUser(sender_id,response) {


    const requestData = {

        "recipient": {
            "id": sender_id
          },
          "message": response
    };


    axios(Request.sendMessageRequestConfig(requestData)).then( (res) => {
        console.log("MSG Sent Successfully");
    }).catch((err)=> {

        console.log(err);
    });


};
