let express = require("express");

let app = express.Router();

let matches = require('../data/friends.js');

// middle wear ( like car wash)
app.get("/api/friend", function(req, res){
    return res.json(matches)
})

app.post('/api/friends', function(req, res) {
    let newFriend = req.body

    friendsList.push(newFriend);

    res.json(newFriend)

})

module.exports = app