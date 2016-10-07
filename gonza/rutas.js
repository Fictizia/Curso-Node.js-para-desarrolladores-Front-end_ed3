var http = require('http'),
      url = require('url');

  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Index!');

    } else if (pathname === '/quienes') {
        res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('sencillamente otra página');


    } else if (pathname === '/hacemos') {
        res.writeHead(301, {
        'Location': 'http://www.google.es/'
      });
      res.end();    

    } else {
        res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('Querido... 404!');
    }

  }).listen(process.env.PORT, process.env.IP);

  