// Haystack 0.0.1
// (c) 2013 Simon Swain
// Haystack may be freely distributed under the MIT license.
// https://github.com/simonswain/haystack

/*global _:true, $:true, Raphael: true, Events: true, io: true, Map: true */
/*jshint browser:true */
/*jshint strict:false */

var resize = function(){

  $('.app').css({
    top: ($(window).height() - $('.app').height())/2
  });

};


var d = [];

var Socket = function(done){

  var self = this;
  _.extend(this, Events);

  var socket = io.connect('http://localhost:3000');

  socket.on('langs', function (data) {
    self.trigger('langs', data);
  });

  socket.on('hashtags', function (data) {
    self.trigger('hashtags', data);
  });

  socket.on('geo', function (data) {
    d.push(data);
    self.trigger('geo', {lng: data[0], lat: data[1]});
  });

};

var Langs = function(opts){

  var self = this;
  this.data = {};
  this.el = opts.el;
  this.w = opts.el.width();
  this.h = opts.el.height();
  /*jshint newcap:false */
  this.r = Raphael(this.el.attr('id'), this.w, this.h);
  /*jshint newcap:true */

  this.render = function(){
    var h = this.h - 24;
    this.r.clear();
    var x = 16;
    var w = 8;
    var f = self.data[0].share;
    _.each(self.data, function(q){
      self.r
        .rect(x - (w/2), h-(h*(q.share/f))+8, w, (h*(q.share/f)))
        .attr({fill: '#fff'});

      self.r.text(x, h + w + 8, q.lang).attr({fill: '#0ff'});
      x += w*2;
    });
  };

  opts.socket.bind(
    'langs',
    function(data){
      self.data =
        _.first(
          _.sortBy(
            _.map(
              data, function(x, i){return {lang: i, share: x};}),
            function(x){return 0 - x.share;}), 20);
      self.render();
    });

};


var Geo = function(opts){
  var self = this;
  var map = opts.map;
  this.add = function(point){
    map.r
      .circle()
      .attr({fill: "#ff0", stroke: false, r: 5})
      .attr(map.getXY(point.lng, point.lat))
      .animate({ opacity: 0.25, r:2, fill: "#c00" }, 2000);
  };

  opts.socket.bind(
    'geo',
    function(data){
      self.add(data);
    });

};


var Hashtags = function(opts){
  var el = opts.el;
  var tpl = _.template('<div><strong>#<%= hashtag %></strong> <span><%= count %></span></div>');

  opts.socket.bind(
    'hashtags',
    function(data){
      el.html('');
      _.each(data, function(x){
        el.append(tpl(x));
      });
    });

};

$(function(){

  resize();

  var socket = new Socket();

  var langs = new Langs({
    el: $('.langs'),
    socket: socket
  });

  var hashtags = new Hashtags({
    el: $('.hashtags'),
    socket: socket
  });

  var map = new Map(function(map){
    var geo = new Geo({
      map: map,
      socket: socket
    });
  });

});
