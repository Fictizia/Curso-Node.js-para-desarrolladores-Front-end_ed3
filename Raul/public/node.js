var http = require('http'),
      url = require('url');

  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Index!');

    } else if (pathname === '/¿Quienes somos?') {
        res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('sencillamente otra página');


    } else if (pathname === '/¿Donde Estamos?') {
        res.writeHead(200, {
        'Location': '/'
      });
      res.end();    

    } else if (pathname === '/¿Que hacemos?') {
        res.writeHead(200, {
        'Location': '/'
      });
      res.end();    

    } else {
        res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('Querido... 404!');
    }

  }).listen(process.env.PORT, process.env.IP);

  console.log('Servidor funcionando en http://'+process.env.IP+':'+process.env.PORT+'/');