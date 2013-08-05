var straw = require('straw');

module.exports = straw.node.extend({
  title: 'Route Tweetes',
  initialize: function(opts, done) {
    var self = this;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;

    //console.log(x.lang, x.user.screen_name, x.text);
    //console.log(JSON.stringify(x));

    self.output('lang', x.lang);
    
    if(x.hasOwnProperty('geo')){
      self.output('geo', x.geo);
    }

    self.output('text', {
      lang: x.lang,
      text: x.text
    });

    done();
  }

});


