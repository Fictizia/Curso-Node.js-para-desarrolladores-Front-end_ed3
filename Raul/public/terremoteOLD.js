#!/usr/bin/env node

  var http = require('http');

  if (!process.argv[2]) {
      console.error('Necesito un parámetro para afinar mis resultados');
      process.exit(1);
  } else {
      if (process.argv[2] !== "all" &&
          process.argv[2] !== "1.0" &&
          process.argv[2] !== "2.5" &&
          process.argv[2] !== "4.5" &&
          process.argv[2] !== "significant") {
          console.error('Parámetro incorrecto!. Solo admito:\n  - all\n - 1.0\n - 2.5\n - 4.5\n - significant\n');
          process.exit(1);
      }
  }

  var options = {
      host: 'earthquake.usgs.gov',
      path: '/earthquakes/feed/v1.0/summary/' + process.argv[2] + '_hour.geojson'
  };

  http.get(options, function(res) {
      var data = "";
      var json;
      res.on("data", function(chunk) {
          data += chunk;
      });
      res.on("end", function() {
          json = JSON.parse(data);

          console.log("*****************************");
          console.log(json.metadata.title);
          console.log("   ---------------------     ");
          console.log("total: " + json.metadata.count);
          console.log("status: " + json.metadata.status);
          console.log("   ---------------------     ");
          console.log(new Date(json.metadata.generated).toLocaleString("es-ES"));
          console.log("==============================");
          for (var i = 0; i < json.features.length; i++) {
              console.log(json.features[i].properties.title);
              console.log(new Date(json.features[i].properties.time).toLocaleString("es-ES"));
              console.log("Magnitud: " + json.features[i].properties.mag);
              console.log("Estatus: " + json.features[i].properties.status);
              console.log("Tipo: " + json.features[i].properties.type);
              console.log("Lugar: " + json.features[i].properties.place);
              console.log("Coordenadas: " + json.features[i].geometry.coordinates[0] + " , " + json.features[i].geometry.coordinates[1]);
              console.log("Info: " + json.features[i].properties.url);
              console.log("Detalles: " + json.features[i].properties.detail);
              console.log("==============================");
          }
          process.exit(0);
      });
  }).on('error', function(e) {
      console.log("Error fetching data: " + e.message);
      process.exit(1);
  });