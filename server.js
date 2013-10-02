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
  app.use('/vendor', express.static(__dirname + '/bower_components'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

var geos = [];
var geo_max = 1000;

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
  geos.push(msg);
  if(geos.length > geo_max){
    geos.shift();
  }
});

io.sockets.on('connection', function (socket) {
  for(var i=0, ii=geos.length; i<ii; i++){
    io.sockets.emit('geo', geos[i]);
  }
});

console.log("Haystack server listening on port 3000");
