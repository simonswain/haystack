// Haystack 0.0.1
// (c) 2013 Simon Swain
// Haystack may be freely distributed under the MIT license.
// https://github.com/simonswain/haystack

var express = require('express');
var http = require('http');
var config = require('./config/config.js');
var straw = require('straw');

var app = express();
var server = require('http').Server(app).listen(config.server.port);

var io = require('socket.io')(server);

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

var langs = [];
var hashtags = [];

var taps = {
  langs: straw.tap({
    input:'client-langs',
    redis: config.redis
  }),
  geo: straw.tap({
    input:'client-geo',
    redis: config.redis
  }),
  hashtags: straw.tap({
    input:'client-hashtags',
    redis: config.redis
  })
};

taps.langs.on('message', function(msg) {
  langs = msg;
  io.emit('langs', msg);
});

taps.hashtags.on('message', function(msg) {
  hashtags = msg;
  io.emit('hashtags', msg);
});

taps.geo.on('message', function(msg) {
  io.emit('geo', msg);
  geos.push(msg);
  if(geos.length > geo_max){
    geos.shift();
  }
});


io.on('connection', function (socket) {
  for(var i=0, ii=geos.length; i<ii; i++){
    io.emit('geo', geos[i]);
  }
  io.emit('langs', langs);
  io.emit('hashtags', hashtags);
});

console.log("Haystack server listening on port 3000");
