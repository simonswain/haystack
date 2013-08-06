$(function(){

  var socket = new Socket();
  var langs = new Langs({
    el: $('.langs'),
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

}

var Langs = function(opts){

  var self = this;
  this.data = {};
  
  this.h = $

  this.el = opts.el;
  this.h = opts.el.height();
  
  this.r = Raphael(this.el.attr('id'), 600, this.h);

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



