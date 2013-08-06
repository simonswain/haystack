var straw = require('straw');
var _ = require('underscore');
module.exports = straw.node.extend({
  title: 'Catch Langs',
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
