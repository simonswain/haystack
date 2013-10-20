var straw = require('straw');
var config = require('./config/config.js');

var topo = new straw.topology({
  'consume-firehose':{
    'node': __dirname + '/nodes/consume-firehose.js',
    'output': 'raw-tweets',
    'twitter': config.twitter
  },
  'route-tweets':{
    'node': __dirname + '/nodes/route-tweets.js',
    'input': 'raw-tweets',
    'outputs': {
      'geo': 'client-geo',
      'lang': 'lang',
      'text': 'text'
    }
  },
  'catch-langs':{
    'node': __dirname + '/nodes/catch-langs.js',
    'input': 'lang',
    'output': 'langs'
  },
  'catch-text':{
    'node': __dirname + '/nodes/catch-text.js',
    'input': 'text',
    'outputs':{
      // 'words':'words',
      // 'urls':'urls',
      'hashtags':'hashtags'
    }
  },
  'catch-hashtags':{
    'node': __dirname + '/nodes/catch-hashtags.js',
    'input': 'hashtags',
    'output': 'client-hashtags'
  },
  'client-hashtags':{
    'node': __dirname + '/nodes/passthru.js',
    'input': 'trending-hashtags',
    'output': 'client-hashtags'
  },
  'client-langs':{
    'node': __dirname + '/nodes/passthru.js',
    'input': 'langs',
    'output': 'client-langs'
  }
}, {
  redis: config.redis,
  statsd: config.statsd  
});
