var express = require('express');
var express = require('express');

var app = express();
app.port = 3000;
var server;

server = require('http').createServer(app);
app.use(express.logger('dev'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.use(express.static(__dirname + '/public'));
app.use(express.methodOverride());
app.use(express.bodyParser());

server.listen(app.port);
