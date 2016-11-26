var keys = requier ('./keys.js');
var twitter = require('twitter');
var client = new twitter(keys.twitterKeys);
var spotify = require('spotify');
var request = require('request');

var liri = {

    twitterApi: {

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

    omdbApi: {

        getMovieInfo: function (movieName) {
            if (!movieName) {
                movieName = "Mr. Nobody"
            }

            var apiUrl = "http://www.omdbapi.com/?t=" + movieName +  "&y=&plot=short&r=json";

            request(apiUrl, this.omdbResponse)
        },

        omdbResponse: function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var parsedBody = JSON.parse(body);
                console.log(parsedBody);
                console.log("Movie Title: " + parsedBody.Title);
                console.log("Release Year: " + parsedBody.Year);
                console.log("IMDB Rating: " + parsedBody.imdbRating);
                console.log("Produced in: " + parsedBody.Country);
                console.log("Language: " + parsedBody.Language);
                console.log("Plot: " + parsedBody.Plot);
                console.log("Actors: " + parsedBody.Actors);
        }
    },
},
};

switch (process.argv[2]) {
    case "my-tweets":
    liri.twitterApi.getRecentTweets();
    break;
    case "movie-this":
    liri.omdbApi.getMovieInfo(process.argv[3]);
    break;
};



