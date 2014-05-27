var straw = require('straw');
var Twitter = require('twitter');

module.exports = straw.node({
  initialize: function(opts, done){
    this.twit = new Twitter(opts.twitter);
    done();
  },
  stop: function(done){
    this.twit.stream.destroy();
    done();
  },
  start: function(done) {
    var self = this;
    this.twit.stream(
      'statuses/sample', 
      function(stream) {
        stream.on(
          'data', 
          function(data) {

            if(!data.hasOwnProperty('id')){
              return;
            }

            if(!data.hasOwnProperty('text')){
              return;
            }

            if(!data.hasOwnProperty('user')){
              return;
            }

            self.output(data);            

          });
        stream.on(
          'error', 
          function(err) {
            console.log(err);
          });
      });
    done();
  }
});



