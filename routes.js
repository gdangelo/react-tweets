var Tweet = require('./models/Tweet');

module.exports = {

    index: function (req, res) {
      // Call static model method to get tweets in the db
      Tweet.getTweets(0, 0, function (tweets) {

        // Render React to a string, passing in the fetched tweets
        var markup = 'Todo';

        // Render the main template
        res.render('home', {
          markup: markup, // Pass rendered react markup
          state: JSON.stringify(tweets) // Pass current state to client side
        });

      });
    },

    page: function (req, res) {
      // Fetch tweets by page via parameters
      Tweet.getTweets(req.params.page, req.params.skip, function (tweets) {

        // Render as JSON
        res.send(tweets);
      });

    }
}
