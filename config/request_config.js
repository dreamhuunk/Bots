module.exports.sendMessageRequestConfig = (requestData) => {



    return {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        method: 'post',
        params: {
        "access_token": process.env.PAGE_TOKEN
        },
        data : requestData
    };
    
};