Math.RADTODEG = 180 / Math.PI;
Math.DEGTORAD = Math.PI / 180;

$(function(){

  resize();

  var socket = new Socket();
  var langs = new Langs({
    el: $('.langs'),
    socket: socket
  });

  var geo = new Geo({
    el: $('.geo'),
    socket: socket
  });

  var map = new Map({
    el: $('.map'),
    geo: geo
  })

});

var transform = function(point) {
}

var resize = function(){

  var margin = 16;

  var w = $(window).width() - (margin);
  var h = $(window).height() - (margin);

  $('.app').css({
    width: w,
    height: h
  });

  $('.geo').css({
    width: w - (2*parseInt($('.geo').css('left'))),
    height: Math.floor(h * 0.5)    
  });

  $('.map').css({
    width: $('.geo').width(),
    height: $('.geo').height()
  });
  
}

var d = [];

var Socket = function(done){

  var self = this;
  _.extend(this, Events);

  var socket = io.connect('http://localhost:3000');

  socket.on('langs', function (data) {
    self.trigger('langs', data);
  });

  socket.on('geo', function (data) {
    d.push(data);
    self.trigger('geo', {x: data[1], y: data[0]});
  });

}

var Langs = function(opts){

  var self = this;
  this.data = {};

  this.el = opts.el;
  
  this.w = opts.el.width();
  this.h = opts.el.height(); 
  this.r = Raphael(this.el.attr('id'), this.w, this.h);
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
  }

  opts.socket.bind(
    'langs', 
    function(data){
      self.data = 
        _.first(
          _.sortBy(
            _.map(
              data, function(x, i){return {lang: i, share: x};}),
            function(x){return 0 - x.share;})
          , 20);
      self.render();
    });

}

var Map = function (opts) {

  // this.el = opts.el;
  // this.w = opts.el.width();
  // this.h = opts.el.height(); 

  // this.r = Raphael(this.el.attr('id'), this.w, this.h);
}

var Geo = function(opts){

  var self = this;
  
  this.el = opts.el;

  this.w = opts.el.width();
  this.h = opts.el.height(); 
  this.r = Raphael(this.el.attr('id'), this.w, this.h);

  this.add = function(point){
    
    point.y *= -1;

    Math.DEGTORAD = Math.PI / 180;

    var x = (point.x + 180) / 180 * this.w / 2;
    var y = Math.sin(point.y * Math.DEGTORAD) * this.h / 2 + this.h / 2; 
    
    var g = self.r.circle(x, y, 20).attr({fill: '#ffff00', 'stroke':false});
    ///var t = self.r.text(x, y, '' + point.x + ', ' + point.y);
    g.animate({ opacity: 1, r:2, fill: "#000000" }, 2000);
  }

  // for(var i=0;i<360;i+=15) {
  //   self.add({x: i-180, y: i/2-90});
  // }

  self.add({y: 33.868, x:151.211});
  self.add({y: -34.0522, x:-118.24});
  self.add({y:-40.71, x: -74.0064});

  opts.socket.bind(
    'geo', 
    function(data){
      self.add(data);
    });

}



