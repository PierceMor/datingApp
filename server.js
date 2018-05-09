var express = require("express");
var path = require("path");
var bodyParser= require("body-parser");


// setting up express app
var app = express();
var PORT = process.env.PORT || 5030;

// setting up app to handle data parsing

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// pass the express app into the required routes 
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);


// makes the server start listening
app.listen(PORT, function() {
    console.log( "App listening on PORT:" + PORT);
});

// test test test 