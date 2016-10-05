var http = require('http');
var type = process.argv[2] = process.argv[2] || "1.0_hour";
var options = {
    host: 'earthquake.usgs.gov',
    path: '/earthquakes/feed/v1.0/summary/'+ type +'.geojson'
}

http.get(options, function(res){
    var json = "";
    res.on('data', function(data) {
            json += data;
        });
        
    res.on('end', function() {
            var parsed = JSON.parse(json);
            console.log("*********************");
            //console.log(parsed);
            console.log("Title: " + parsed.metadata.title || "error");
            console.log("Total earthquakes: " + parsed.metadata.count || "error");
            console.log("---------------------");
            for(var i = 0; i < parsed.features.length; i++){
                console.log("Earthquake id: " + parsed.features[i].id);
            }
        });
});