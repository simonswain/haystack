var straw = require('straw');

var util = require('util');
var Twitter = require('twitter');

module.exports = straw.node.extend({
  title: 'Consume Firehose',
  initialize: function(opts, done){
    this.twit = new Twitter(opts.twitter);
    process.nextTick(done);
  },
  run: function(done) {
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
    
    done(false);
  }
});



