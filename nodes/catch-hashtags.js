var straw = require('straw');

module.exports = straw.node.extend({
  title: 'Catch Hashtags',
  hashtags: {},
  changed: false,
  opts: {interval: 1000},
  initialize: function(opts, done) {
    var self = this;
    this.opts.interval = opts && opts.interval || 1000;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;

    x = x.substr(1);
    x = x.toLowerCase();

    if(!this.hashtags.hasOwnProperty(x)){
      this.hashtags[x] = 0;
    }

    this.hashtags[x]++;
    this.changed = true;
    done();
  },
  run: function(done) {
    var self = this;
    var fn = function() {
      self.ping();
    };
    this.timer = setInterval(fn, this.opts.interval);
    done(false);
  },
  stop: function(done) {
    clearInterval(this.timer);
    done(false);
  },
  ping: function() {

    if(!this.changed){
      return;
    }

    var trending = [];

    for(var hashtag in this.hashtags) {
      if(hashtag === ''){
        continue;
      }
      trending.push({
        hashtag: hashtag,
        count :this.hashtags[hashtag]
      });
    }

    trending.sort(function (a,b) {
      return b.count - a.count;
    });

    trending = trending.slice(0, 5);

    this.changed = false;
    console.log(JSON.stringify(trending));
    this.output(trending);
  }

});
