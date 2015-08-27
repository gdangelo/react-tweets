var Tweet = require('../models/Tweet');

module.exports = function (stream, io) {

  // When receiving new tweets...
  stream.on('tweet', function (tweet) {

    // Construct a new tweet object
    var newTweet = {
      twid: tweet['id'],
      active: false,
      author: tweet['user']['name'],
      avatar: tweet['user']['profile_image_url'],
      body: tweet['text'],
      date: tweet['created_at'],
      screenname: tweet['user']['screen_name']
    };

    // Create a new model instance
    var tweetEntry = new Tweet(newTweet);

    // Save it to the db
    tweetEntry.save(function(err) {
      if (!err) {
        // Emit a socket event to the client with the tweet
        io.emit('tweet', newTweet);
      }
    })
  });
};
