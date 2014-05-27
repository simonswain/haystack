var straw = require('straw');
var _ = require('underscore');

module.exports = straw.node({
  langs: {},
  total: 0,
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
    this.total++;
    this.changed = true;
    done();
  },
  start: function(done) {
    this.timer = setInterval(this.ping.bind(this), this.opts.interval);
    done();
  },
  stop: function(done) {
    clearInterval(this.timer);
    done();
  },
  ping: function() {
    var self = this;
    if(!this.changed){
      return;
    }
    
    this.changed = false;
    var msg = {};
    _.each(this.langs, function(x, i){
      msg[i] = (x / self.total);
    });
    this.output(msg);
  }

});
