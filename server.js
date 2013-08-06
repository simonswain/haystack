var express = require('express');
var http = require('http');
var config = require('./config/config.js');
var straw = require('straw');

var app = express();
var server = app.listen(config.server.port);
var io = require('socket.io').listen(server,{log: false});

app.configure(function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

var taps = {
  langs: new straw.tap({
    'input':'client-langs',
  }),
  geo: new straw.tap({
    'input':'client-geo',
  }),
};

taps.langs.on('message', function(msg) {
  io.sockets.emit('langs', msg);
});

taps.geo.on('message', function(msg) {
  io.sockets.emit('geo', msg);
});

console.log("Haystack server listening on port 3000");
