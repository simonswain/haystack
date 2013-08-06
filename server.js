var express = require('express');
var http = require('http');
var config = require('./config/config.js');
var straw = require('straw');

var app = express();
var server = app.listen(config.server.port);
var io = require('socket.io').listen(server);

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

// io.sockets.on('connection', function (socket) {
//   socket.emit('data', { at: new Date().getTime() });
// });

var tap = new straw.tap({
  'input':'client-langs',
});

tap.on('message', function(msg) {
  io.sockets.emit('langs', msg);
});

console.log("Haystack server listening on port 3000");
