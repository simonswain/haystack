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
    _.each(self.data, function(q){
      self.r
        .rect(x - (w/2), h-(h*q.share), w, (h*q.share))
        .attr({fill: '#fff'});

      self.r.text(x, h + w, q.lang).attr({fill: '#0ff'});
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


var Geo = function(opts){

  var self = this;
  
  this.el = opts.el;

  this.w = opts.el.width();
  this.h = opts.el.height(); 
  this.r = Raphael(this.el.attr('id'), this.w, this.h);

  this.add = function(point){
    var x = 32 + (((90 + point[1])/360) * this.w);
    var y = (this.h - ((90 + point[0])/180) * this.h);
    var g =self.r.circle(x, y, 1).attr({fill: '#f00', 'stroke':false});
    g.animate({ fill: "#0ff" }, 500);
  }

  opts.socket.bind(
    'geo', 
    function(data){
      self.add(data);
    });

}



