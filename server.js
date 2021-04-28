const express = require("express");
const bodyParser = require("body-parser");
const Mongoose = require('./config/mongoose');
const MongoDB = require('./config/mongodb');
const cors = require('cors');
const app = express();

//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
//Connect to mongodb
var mongo = MongoDB();
var mongoose = Mongoose();

//Routes
require('./routes/User.routes')(app);

const port = process.env.PORT || 5000;  //process.env.port is Heroku's port if you choose to deplay the app there
app.listen(port, () => console.log("Server up and running on port " + port));