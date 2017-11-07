var friends = require('../data/friends.js');


//Sets the exports object to a function
module.exports = function(app){

  // API GET Requests
  app.get('/api/friends', function(req, res){
    res.json(friends);
  });

  // API POST Requests
  app.post('/api/friends', function(req, res){

    var perfectFit = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Here we take the result of the user's survey POST and parse it.
    var userResponse = req.body;
    var userName = userResponse.name;
    var userPhoto = userResponse.photo;
    var userScores = userResponse.scores;

    var totalDifference = 0;

    // Loop through all the friend possibilities in the database.
    for  (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      // Loop through all the scores of each friend
      for (var j = 0; j< friends[i].scores[j]; j++){

        // We calculate the difference between the scores and sum them into the totalDifference
        // The abs() method returns the absolute value of a number
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= perfectFit.friendDifference){

          // Reset the perfectFit to be the new friend.
          perfectFit.name = friends[i].name;
          perfectFit.photo = friends[i].photo;
          perfectFit.friendDifference = totalDifference;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userResponse);

    // Return a JSON with the user's perfectFit. This will be used by the HTML in the next page.
    res.json(perfectFit);
  });
};