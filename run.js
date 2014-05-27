// Haystack 0.0.2
// (c) 2014 Simon Swain
// Haystack may be freely distributed under the MIT license.
// https://github.com/simonswain/haystack

var straw = require('straw');
var config = require('./config/config.js');

var opts = {
  nodes_dir: __dirname + '/nodes',
  redis: config.redis
};



var cls = function(){
  process.stdout.write('\u001B[2J\u001B[0;0f');
};

var topo = straw.create(opts);

topo.add([{
  id: 'consume-firehose',
  node: 'consume-firehose',
  output: 'raw-tweets',
  twitter: config.twitter
}, {
  id: 'route-tweets',
  node: 'route-tweets',
  input: 'raw-tweets',
  outputs: {
    geo: 'client-geo',
    lang: 'lang',
    text: 'text'
  }
}, {
  id: 'catch-langs',
  node: 'catch-langs',
  input: 'lang',
  output: 'langs'
}, {
  id: 'catch-text',
  node: 'catch-text',
  input: 'text',
  outputs:{
    // words :'words',
    // urls :'urls',
    hashtags:'hashtags'
  }
}, {
  id: 'catch-hashtags',
  node: 'catch-hashtags',
  input: 'hashtags',
  output: 'client-hashtags'
}, {
  id: 'client-hashtags',
  node: 'passthru',
  input: 'trending-hashtags',
  output: 'client-hashtags'
}, {
  id: 'client-langs',
  node: 'passthru',
  input: 'langs',
  output: 'client-langs'
}], function(){
  topo.start({purge: true});
});

var stats = function(){
  topo.stats(function(err, data){
    cls();
    console.log(new Date());
    // stats.nodes show input/output counts
    // stats.pipes show unprocessed messages in pipe
    console.log(data);
  });
};

var interval = setInterval(stats, 1000);

process.on( 'SIGINT', function() {
  topo.destroy(function(){
    console.log( 'Finished.' );
  });
});
