var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Create a new schema for the tweet data
var schema = new Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
});

// Create a static method to return tweet data from the mongodb
schema.static.getTweets = function (page, skip, callback) {
  var tweets = [],
      start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  this.find({}, 'twid active author avatar body date screenname', {skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs) {

    if(!err) {
      tweets = docs;
      tweets.forEach(function (tweet) {
        tweet.active = true; // Set retrieved tweets to active
      });
    }

    // Pass them back to the specified callback
    callback(tweets);

  });
};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);
