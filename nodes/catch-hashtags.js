var straw = require('straw');

module.exports = straw.node({
  hashtags: {},
  changed: false,
  opts: {interval: 1000},
  initialize: function(opts, done) {
    var self = this;
    this.opts.interval = opts && opts.interval || 1000;
    done();
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
  start: function(done) {
    this.timer = setInterval(this.count.bind(this), this.opts.interval);
    done();
  },
  stop: function(done) {
    clearInterval(this.timer);
    done();
  },
  count: function() {

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

    trending = trending.slice(0, 25);

    this.changed = false;
    this.output(trending);
  }

});
