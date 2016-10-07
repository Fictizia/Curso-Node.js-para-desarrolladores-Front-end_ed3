var http = require('http');
var url ='earthquake.usgs.gov';
var path = '/earthquakes/feed/v1.0/summary/significant_hour.geojson';
     
       
           
     http.get({ host: url, path: path }, function(response) {
              
                var pintar = '';
              response.on('data', function(d){
                  pintar += d;
              });
              response.on('end', function() {
                  var parseada = JSON.parse(pintar);
                  console.log ("=============================");
                  console.log(pintar);
                  console.log(parseada.metadata.title);
                  console.log("el tipo es: " + parseada.type);
                  console.log("la metadata generada es: " + new Date(parseada.metadata.generated).toLocaleString("es-ES"));
                  
                  console.log("==============================");
            
       });
     });
    
      
       
 
