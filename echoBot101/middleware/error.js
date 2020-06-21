//All uncaught exception will be handled here

const response = require('../utils/response');

module.exports = function(err,req,res,next)
{
    console.log(err.message);
    return response.responseWriter(res,500,{message: "Internal Error"});

};