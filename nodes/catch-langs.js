var straw = require('straw');

module.exports = straw.node.extend({
  title: 'Catch Langs',
  langs: {},
  changed: false,
  opts: {interval: 1000},
  initialize: function(opts, done) {
    var self = this;
    this.opts.interval = opts && opts.interval || 1000;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;

    if(!this.langs.hasOwnProperty(x)){
      this.langs[x] = 0;
    }

    this.langs[x] ++;
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
    this.changed = false;
    console.log(JSON.stringify(this.langs));
    this.output(this.langs);
  }

});
