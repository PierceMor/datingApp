let express = require('express');
let app = express.Router();
let path = require('path');


function htmlRoute(app){
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/../public/home.html'));
});

app.get('/survery', function(req, res){
    res.sendFile(path.join(__dirname, "/../public/survery.html"));
});

app.use("*", function(req, res){
    res.sendFile(path.join(__dirname, "/../public/home.html"));
});

};
module.exports = htmlRoute;

