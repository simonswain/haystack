/*global Raphael: true, worldmap: true */
/*jshint browser:true */
/*jshint strict:false */

/*jshint -W079 */
var Map = function(done){
  /*jshint +W079 */
  /*jshint newcap:false */
  Raphael('map', 1000, 400, function () {
    /*jshint newcap:true */
    var r = this;
    r.setStart();
    for (var country in worldmap.shapes) {
      r.path(worldmap.shapes[country]).attr({stroke: "#0ff", fill: "#111", "stroke-opacity": 0.2});
    }

    var world = r.setFinish();

    world.getXY = function (lat, lon) {
      return {
        cx: lon * 2.6938 + 465.4,
        cy: lat * -2.6938 + 227.066
      };
    };

    world.getLatLon = function (x, y) {
      return {
        lat: (y - 227.066) / -2.6938,
        lon: (x - 465.4) / 2.6938
      };
    };

    var latlonrg = /(\d+(?:\.\d+)?)[\xb0\s]?\s*(?:(\d+(?:\.\d+)?)['\u2019\u2032\s])?\s*(?:(\d+(?:\.\d+)?)["\u201d\u2033\s])?\s*([SNEW])?/i;

    world.parseLatLon = function (latlon) {
      var m = String(latlon).split(latlonrg),
      lat = m && +m[1] + (m[2] || 0) / 60 + (m[3] || 0) / 3600;
      if (m[4].toUpperCase() === "S") {
        lat = -lat;
      }
      var lon = m && +m[6] + (m[7] || 0) / 60 + (m[8] || 0) / 3600;
      if (m[9].toUpperCase() === "W") {
        lon = -lon;
      }
      return this.getXY(lat, lon);
    };
    world.r = r;
    return done(world);
  });
};
