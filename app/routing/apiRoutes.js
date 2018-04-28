module.exports = function apiRoutes(app) {
    let fs = require('fs');
    let path = require("path");
    let friends = require('./../data/friends.js');

    app.get("/api/friends", function (req, res){
        return res.json(friends);
    });

    app.post('/api/friends', function (req, res){
        var total;
        var diffArray= [];
        var newFriend = req.body;

        for (var i = 0; i<friends.length; i++){
            total = 0;
            for (var j = 0; j<newFriend.scores.length; j++){
                total += Math.abs(friends[i].score[i] - newFriend.scores[j]);
            }
            diffArray.push(total);
        }

        var match = diffArray.indexOf(math.min(...diffArray));

        friends.push(newFriend);

        console.log(newFriend);

        fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", function(err, data){
            if (err) throw err;
            var json = JSON.parse(data);
            json.push(newFriend);
            fs.writeFile(path.join(__dirname, "../data/friend.json"), JSON.stringify(json, null, 2), function(err){
                if (err) throw err;
            })
        })
        res.json(friends[match]);
    })

} 