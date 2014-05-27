var straw = require('straw');

module.exports = straw.node({
  process: function(x, done) {
    var self = this;
    console.log(JSON.stringify(x));
    done();
  }
});
