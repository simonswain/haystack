var straw = require('straw');
var Twit = require('twit');

module.exports = straw.node({
  initialize: function (opts, done) {
    this.twit = new Twit(opts.twitter);
    done();
  },
  stop: function (done) {
    this.twit.stream.destroy();
    done();
  },
  start: function (done) {
    var self = this;
    var s = this.twit.stream('statuses/sample');
    s.on('tweet', function (data) {
      if (!data.hasOwnProperty('id')) {
        return;
      }
      if (!data.hasOwnProperty('text')) {
        return;
      }
      if (!data.hasOwnProperty('user')) {
        return;
      }
      self.output(data);
    });
    s.on(
      'error',
      function (err) {
        console.log(err);
      });
    done();
  }
});



