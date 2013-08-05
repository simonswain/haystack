var straw = require('straw');

var urlPattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

var hashtagPattern = new RegExp(/(#[0-9A-Za-z\-]*)/);
var atPattern = new RegExp(/(@[0-9A-Za-z\-]*)/);


module.exports = straw.node.extend({
  title: 'Catch Text',
  initialize: function(opts, done) {
    var self = this;
    process.nextTick(done);
  },
  process: function(x, done) {
    var self = this;

    if(x.lang != 'en') {
      return done();
    }

    var match;

    match = x.text.match(urlPattern);
    if(match) {
      var url = match.shift();
      //console.log(url);
      self.output('urls', url);
    }

    match = x.text.match(hashtagPattern);
    if(match) {
      var hashtag = match.shift();
      console.log(hashtag);
      self.output('hashtags', hashtag);
    }

    var newWords = [], words = x.text.split(' ');

    for(var i in words){
      if(! (words[i].match(hashtagPattern) ||
            words[i].match(urlPattern) ||
            words[i].match(atPattern))) {
        newWords.push(words[i]);
      }
    }

    if(newWords.length>0) {
      // console.log(newWords);
      self.output('words', newWords);
    }

    done();

  }
});
