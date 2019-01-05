var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweetAndFavorite = function () {
  var params = {
    q: '#codeWithPride',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
        // if there was an error while tweeting
        if (err) {
          console.log('Something went wrong while RETWEETING... Duplication maybe...');
        }
      });

      Twitter.post('favorites/create', { id: retweetId }, function (err, response) {
        // if there was an error while 'favorite'
        if (err) {
          console.log('CANNOT BE FAVORITE... Error');
        }
        else {
          console.log('FAVORITED... Success!!!');
        }
      });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};

// rewtweet every hour
// ms * sec * mins
retweetAndFavorite();
setInterval(retweetAndFavorite, 1000 * 60 * 29);
