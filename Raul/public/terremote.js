var http = require('http');

var options = {
  host: 'earthquake.usgs.gov',
  path: '/earthquakes/feed/v1.0/summary/significant_hour.geojson'
};


http.get(options, function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
});