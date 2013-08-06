$(function(){

  var socket = new Socket();
  var langs = new Langs({
    el: $('.langs'),
    socket: socket
  });

  var geo = new Geo({
    el: $('.geo'),
    socket: socket
  });

});

var Socket = function(done){

  var self = this;
  _.extend(this, Events);

  var socket = io.connect('http://localhost:3000');

  socket.on('langs', function (data) {
    self.trigger('langs', data);
  });

  socket.on('geo', function (data) {
    self.trigger('geo', data);
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
    _.each(self.data, function(q, i){
      self.r
        .rect(x - (w/2), h-(h*q), w, (h*q))
        .attr({fill: '#fff'});

      self.r.text(x, h + w, i).attr({fill: '#0ff'});
      x += w*2;
    });
  }

  opts.socket.bind(
    'langs', 
    function(data){
      self.data = data;
      self.render();
    });

}


var Geo = function(opts){

  var self = this;
  
  this.el = opts.el;

  this.w = opts.el.width();
  this.h = opts.el.height(); 
  this.r = Raphael(this.el.attr('id'), this.w, this.h);

  this.add = function(point){
    var x = 32 + (((90 + point[1])/360) * this.w);
    var y = (this.h - ((90 + point[0])/180) * this.h);
    
    console.log(point, x, y);
    self.r.circle(x, y, 2).attr({fill: '#0ff'});
  }

  opts.socket.bind(
    'geo', 
    function(data){
      self.add(data);
    });

}



