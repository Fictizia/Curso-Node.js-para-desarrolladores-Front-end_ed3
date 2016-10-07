var http = require('http'),
    fs = require('fs'),
    url = require('url');

  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Index!');

    } else if (pathname === '/funciona') {
        res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end('funciona');


    } else if (pathname === '/google') {
        res.writeHead(301, {
        'Location': 'http://www.google.es'
      });
      res.end();    

    } else if (pathname === '/apagado') {
      res.end();
      process.exit();

    } else {
        res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('Querido... 404!');
    }

  }).listen(process.env.PORT, process.env.IP);

  console.log('Servidor funcionando en http://'+process.env.IP+':'+process.env.PORT+'/');
  