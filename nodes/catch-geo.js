var straw = require('straw');

module.exports = straw.node.extend({
  title: 'Catch Geo',
  initialize: function(opts, done) {
    var self = this;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;
    //console.log(JSON.stringify(x));
    done();
  }
});
