// var keys = requier ('./keys.js'); Having troubles getting this to work
// var fs = require('./random.txt'); //When I use this my other commands don't work
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var client =  twitter ({
    consumer_key: 'dGo6BsjEqAXEsFrEcM3WsztAF',
    consumer_secret: 'oZeQGlXBwIGu8X64LK8jiv1Od7L2vLaJZYYuoGl89Ev29FEc5q',
    access_token_key: '2207277643-ukEccM8566r4SKUwLQNJP6qGoTZqwfvfwCEHlwu',
    access_token_secret: 'GUOfPLzMt6SdfRkMDnZaSFvyIgrdrXkYGTgeFMuDFudxy',
});

//creating Liri app
var liri = {

    omdbApi: {

        getMovieInfo: function (movieName) {
            if (!movieName) {
                movieName = "Mr. Nobody"
            }

            var apiUrl = "http://www.omdbapi.com/?t=" + movieName +  "&y=&plot=short&tomatoes=true&r=json";

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
                console.log("Rotten Tomatoes Rating: " + parsedBody.Tomatoes);
        }
    },
},

    spotifyApi: {

        getSongInfo: function (songName) {
            
            if (!songName) {
                songName = "The Sign";
            }

            spotify.search({ type: 'track', query: songName }, (error, data) => {
                if (!error) {
                    
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("Album Name: " + data.tracks.items[0].album.name + "\n");
                    
                }
            });
        }
    },

    twitterApi: {

       getRecentTweets: function() {
           var params = { screen_name: "JeffreyB05"}
           client.get('statuses/user_timeline', params, this.getMyRecentTweets);
       },

       getMyRecentTweets: function (error, tweets, response) {
           if (!error) {
               for (var i = 0; i < tweets.length; i++) {
                console.log("This Tweet Was Created On " + tweets[i].created_at);
                console.log("Tweet Text: " + tweets[i].text + "\n");
               }
           }
       } 
    },

    doWhatItSays: {

        readFileResult: function(error, data) {

            if(error){
                console.log(error);
                return;
            }

            console.log(data);

            fs.readFile("random.txt", "utf8", readFileResult);
        }
        
    }
};

switch (process.argv[2]) {
    case "my-tweets":
    liri.twitterApi.getRecentTweets(process.argv[3]);
    break;
    case "movie-this":
    liri.omdbApi.getMovieInfo(process.argv[4]);
    break;
    case "spotify-this-song":
    liri.spotifyApi.getSongInfo(process.argv[5]);
    break;
    case "do-what-it-says":
    liri.doWhatItSays.readFileResult(process.argv[6]);
    break;
    default:
    console.log("Please Try Again");
    break;
};



