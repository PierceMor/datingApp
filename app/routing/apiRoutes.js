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


// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });

};