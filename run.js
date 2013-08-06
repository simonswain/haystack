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
      'geo': 'geo',
      'lang': 'lang',
      'text': 'text'
    }
  },
  'catch-geo':{
    'node': __dirname + '/nodes/catch-geo.js',
    'input': 'geo'
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
      'hashtags':'hashtags',
      'words':'words',
      'urls':'urls'
    }
  },
  'catch-hashtags':{
    'node': __dirname + '/nodes/catch-hashtags.js',
    'input': 'hashtags',
    'output': 'trending-hashtags'
  },
  'client-hashtags':{
    'node': __dirname + '/nodes/passthru.js',
    'input': 'trending-hashtags',
    'output': 'clients-hashtags'
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
