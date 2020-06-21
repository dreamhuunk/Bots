require('dotenv').config({ path: process.cwd() + '/config/.env' });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const route = require('./routes/route');

const error = require('./middleware/error');


app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//Routes has to go here

app.use(route);


//Middleware goes here

app.use(error);



app.listen(process.env.PORT,() => {
    console.log(`Server started Listening at port : ${process.env.PORT}`);
});