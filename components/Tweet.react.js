var React = require('react');

var Tweet = React.createClass({

    render: function () {
      var tweet = this.props.tweet;
      return (
        <li className={'tweet' + (tweet.active ? ' active' : '')}>
          <img src={tweet.avatar} className='avatar' />
          <blockquote>
            <cite>
              <a href={"http://twitter.com/" + tweet.screename}>{tweet.author}</a>
              <span className="screen-name">@{tweet.screename}</span>
            </cite>
            <span className="content">{tweet.body}</span>
          </blockquote>
        </li>
      );
    }

});

module.exports = Tweet;
