var express = require("express");
var path = require("path");
var bodyParser= require("body-parser");


// setting up express app
app = express();
var PORT = process.env.PORT || 3000;

// setting up app to handle data parsing

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());



// pass the express app into the required routes 
require('./app/routing/apiRoutes');
require('./app//routing/htmlRoutes');


// makes the server start listening
app.listen(PORT, function() {
    console.log( "App listening on PORT:" + PORT);
});