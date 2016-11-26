var keys = requier ('keys.js');
var twitter = require('twitter');
var client = new twitter(keys.twitterKeys);
var spotify = require('spotify');
var request = requier('request')

var liri {

    twitterAPI: {

       getRecentTweets: function() {
           var params = { screen_name: "JeffreyB05"}
           client.get('statuses/user_timeline', params, this.getMyRecentTweetsRequest);
       },

       getMyRecentTweetsRequest: function (error, tweets, response) {
           if (!error) {
               for (var i = 0; i < tweets.length; i++) {
                   console.log("This Tweet Was Created On " + tweets[i].created_at);
                   console.log("Tweet Text: " + tweets[i].text + "\n");
               }
           }
       } 
    },
}

switch (process.argv[2]) {
    case "my-tweets":
    liri.twitterAPI.getRecentTweets();
    break;
}



