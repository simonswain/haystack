var straw = require('straw');

module.exports = straw.node.extend({
  title: 'Route Tweetes',
  initialize: function(opts, done) {
    var self = this;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;

    if(x.hasOwnProperty('geo') && x.geo && x.geo.hasOwnProperty('type') && x.geo.type == 'Point'){
      console.log(JSON.stringify(x.geo.coordinates));
      self.output('geo', x.geo.coordinates);
    }

    self.output('lang', x.lang);

    self.output('text', {
      lang: x.lang,
      text: x.text
    });

    done();
  }

});


