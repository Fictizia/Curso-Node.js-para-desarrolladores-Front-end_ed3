# Clase 5

### Process

- **[Códigos de salida en Node.js](https://nodejs.org/dist/latest-v4.x/docs/api/process.html#process_exit_codes)**
	- 1 - *Uncaught Fatal Exception - No ha podido ser capturada*
	- 2 - **Unused (reserved by Bash for builtin misuse)**
	- 3 - *Internal JavaScript Parse Error *
	- 4 - *Internal JavaScript Evaluation Failure *
	- 5 - *Fatal Error - There was a fatal unrecoverable error in V8.*
	- 6 - *Non-function Internal Exception Handler*
	- 7 - *Internal Exception Handler Run-Time Failure*
	- 8 - **Unused**
	- 9 - *Invalid Argument*
	- 10 - *Internal JavaScript Run-Time Failure *
	- 12 - *Invalid Debug Argument*
	- 128 - *Signal Exits - El sistema operativo acaba con Node.*


- **process.argv:**
```javascript
  console.log(process.argv)
  /*
  1. ubicacion de node (bin)
  2. ubicación del script (location)
  3. [Otros parametros]
  */
  
```

- **Detalles del sistema**
```javascript
	process.argv[2] = process.argv[2] || "Node.js funcionando desde C9.io";

	console.log("===================================");
	console.log("Id: " + process.pid);
	console.log("Título: " + process.title);
	console.log("Ruta: " + process.execPath);
	console.log("Directorio Actual: " + process.cwd());
	console.log("Node Versión: " + process.version);
	console.log("Plataforma: " + process.platform);
	console.log("Arquitectura: " + process.arch);
	console.log("Tiempo activo: " + process.uptime());
	console.log("Versiones Dependencias: ");
	process.argv.forEach((val, index, array) => {
	      console.log(`${index}: ${val}`);
	});
	console.log("===================================");
```

- **console.log("Hola"):**
```javascript
  var mensaje = "Hola"
  process.stdout.write(mensaje + '\n')
```

**Captura de errores inesperados**
```javascript
  process.on('uncaughtException', function (err) {
  	console.error(error.stack);
  });
```
- Es interesante almacenar estos errores o enviarlos por email.
- Estos errores se escapan del sistema convencional de errores.

**Ejecucción de tareas antes de la finalización del proceso**
```javascript
  process.on('exit', function (err) {
  	// Limpiar cache.. y cosas similares...
  });
```

**Captura de [señales en entronos UNIX](https://www.wikiwand.com/en/Unix_signal)**

```javascript
// SIGINT -> Control-C

process.stdin.resume(); // Evitamos que se cierre Node.js

process.on('SIGINT', function() {
  console.log('Llegó SIGINT. Control-C... Saliendo...');
  process.exit(0);
});
```

### Creando ejecutables
- Solo para entornos UNIX

- Necesitamos *shebang*
```javascript
	#!/usr/bin/env node
	console.log('Soy un script!');
```

- Necesitamos hacer el script ejecutable
```
chmod +x mi_escript_archivo.js
```

- Ejecutando el script
```
./mi_escript_archivo.js <parámetro>
```

**Ejemplo: hola**
```javascript
#!/usr/bin/env node
console.log("hola");
process.exit(1);
```

**Arrancar Scripts al incio del sistema**
- Librerías:
	- [node-upstarter](https://github.com/carlos8f/node-upstarter) 


### Ejercicios

**1 -** Realiza un script ejecutable que nos muestre la información de los terremotos acontecidos en la última hora.
- [Fuente de datos](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Requisitos:
	- Debemos utilizar párametros cuando se ejecute para definir la magnitud de los terremotos que queremos
	- Si no se detecta el parámetro... la aplicación debe cerrarse.
	- Si el parametro es incorrecto también.
	- Ajustaremos la petición http en función del parámetro. 
- Apariencia(Orientativa):
```
*****************************
USGS All Earthquakes, Past Hour
   ---------------------     
total: 8
status: 200
   ---------------------     
5/10/2016, 3:46:30 PM
==============================
M 1.3 - 6km WNW of Anza, California
5/10/2016, 3:43:01 PM
Magnitud: 1.32
Estatus: automatic
Tipo: earthquake
Lugar: 6km WNW of Anza, California
Coordenadas: -116.7246704 , 33.5830002
Info: http://earthquake.usgs.gov/earthquakes/eventpage/ci37563240
Detalles: http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci37563240.geojson
==============================
... (por cada terremoto de los iguales a los iguales)
```

Solución:
```javascript
  // Tu solución
```


###  Child Process
- Ideal para tareas pesadas, inestables o muy lentas
- Nos permite usar comandos del sistema.
- Podemos lanzar aplicaciones basadas en otros lenguajes o sistemas.

- **Creando hijos y usando spawn**
-  *spawn* devuelve un *stream*
```javascript
var spawn = require('child_process').spawn;
var ping = spawn('ping', ['fictizia.com']);

ping.stdout.setEncoding('utf8');
ping.stdout.on('data', function (data) {
  console.log(data);
});
```

- **Creando hijos y usando exec**
-  *exec* retorna un *buffer*
```javascript
  var exec = require('child_process').exec

  // cat solo funciona en UNIX
  exec('cat texto.txt', function (err, stdout, stderr) {
    if(!err){  
        console.log('El contenido de nuestro archivo', stdout)
    } else {
        console.log('Error: '+err)
    }
  })
```

- **Manejando hijos:**
```javascript
  var spawn = require('child_process').spawn

  if(process.argv[2] === 'hijo'){
    console.log('Estoy dentro del proceso hijo');
  } else {
    var hijo = spawn(process.execPath, [__filename, 'hijo'])
    hijo.stdout.pipe(process.stdout)
  }

```

- **Manejando hijos (con heréncia):**
```javascript
  var spawn = require('child_process').spawn

  if(process.argv[2] === 'hijo'){
    console.log('Estoy dentro del proceso hijo');
  } else {
    var hijo = spawn(process.execPath, [__filename, 'hijo'], {
      stdio: 'inherit'
    })
  }

```

- **Manejando hijos (contexto común):**
```javascript
  var spawn = require('child_process').spawn;

  var contador = 0;
  contador += 1;

  if(process.argv[2] === 'hijo'){
    console.log('hijo', contador);
    contador++;
    console.log('pero.. además el hijo.. suma otra! y son', contador);
  } else {
    var hijo = spawn(process.execPath, [__filename, 'hijo'], {
      stdio: 'inherit'
    });
    console.log('padre', contador);
  }

```

### Cluster

- **Sin usar Cluster**
```javascript
    var http = require('http');
    var url = require('url');

    var server = http.createServer().listen(process.env.PORT);

    server.on('request', function (req, res) {
        var pathname = url.parse(req.url).pathname;
        if (pathname === '/matame') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Has matado el monohilo. PID: ' + process.pid);
            process.exit(0);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Hola desde el monohilo. PID: ' + process.pid);
        }
    });

    console.log('Servidor escuchando por el puerto ' +process.env.PORT);
```

- **Usando Cluster.**
	- El proceso hijo que cae se vuelve a levantar.
	- El proceso padre se mantiene "separado"

```javascript
	var cluster = require('cluster'),
	    http = require('http'),
	    url = require('url'),
	    cpus = require('os').cpus().length; // nproc
	
	if (cluster.isMaster) {
	    console.log('Proceso maestro con PID:', process.pid);
	
	    for (var i = 0; i < cpus; i++) {
	        cluster.fork();
	    }
	
	    cluster.on('exit', function(worker) {
	        console.log('hijo con PID ' + worker.process.pid + ' muerto');
	        cluster.fork();
	    });
	
	} else {
	    console.log('Arrancado hijo con PID:', process.pid);
	
	    var server = http.createServer().listen(process.env.PORT);
	
	    server.on('request', function (req, res) {
	        var pathname = url.parse(req.url).pathname;
	        if (pathname === '/matame') {
	            res.writeHead(200, {
	                'Content-Type': 'text/plain'
	            });
	            res.end('Has matado al proceso hijo ' + process.pid);
	            process.exit(0);
	        } else {
	            res.writeHead(200, {
	                'Content-Type': 'text/plain'
	            });
	            res.end('Hola desde ' + process.pid);
	        }
	    });
	}
```

- [Taking Advantage of Multi-Processor Environments in Node.js](http://blog.carbonfive.com/2014/02/28/taking-advantage-of-multi-processor-environments-in-node-js/#tldr)

- **Librerias:**
	- [luster](https://github.com/nodules/luster)
	- [cluster-map](https://www.npmjs.com/package/cluster-map)
	- [PM2](https://www.npmjs.com/package/pm2)

### Buffer
- Nos ofrece la posibilidad de alamacenar datos sin procesar
- Una vez iniciados no puede modificarse el tamaño
- Tamaño máximo 1GB
```javascript
const buf1 = new Buffer(10); // buf1.length = 10
const buf2 = new Buffer([1,2,3]); // [01, 02, 03]
const buf3 = new Buffer('prueba'); // ASCII [74, 65, 73, 74]
const buf4 = new Buffer('ñam ñam', 'utf8'); // UTF8 [74, c3, a9, 73, 74]
  
console.log("===================================");
console.log("buf1: " + buf1.length);
console.log("buf2: " + buf2[0]);
console.log("buf3: " + buf3);
console.log("buf3 (hex): " + buf3.toString('hex'));
console.log("buf3 (base64): " + buf3.toString('base64'));
console.log("buf4: " + buf4);
console.log("buf4 (hex): " + buf4.toString('hex'));
console.log("buf4 (base64): " + buf4.toString('base64'));
console.log("===================================");
```


### Stream
- Gestionamos el *flujo de datos*
- Muy usados por librerías y modulos
- Capa de abstracción para operaciones con datos
- Lógica de tuberias (cadena de procesos)
- Gestiona el *buffer* por si mismo
- Tipos:
	- Redeable *Lectura*
		- Eventos (data, error, end)
	- Writable *Escritura*
		- Eventos (drain, error, finish)
	- Duplex *Ambos*
	- Transform *Transformación de datos*
	- PassThrough *No manipula, solo manipula*
- **Función .pipe()**
	- Simple: 
	`origen.pipe(destino);`
	- Concatenando:
	`origen.pipe(destino).pipe(otroDestino);`

- **Ejemplo: Stream multimédia**
```javascript
	var http = require('http'),
	    fs = require('fs');
	
	http.createServer(function(req, res) {
	  var cancion = 'cancion.mp3';
	  var stat = fs.statSync(cancion);
	
	  res.writeHead(200, {
	    'Content-Type': 'audio/mpeg',
	    'Content-Length': stat.size
	  });
	
	  var readableStream = fs.createReadStream(cancion);
	  readableStream.pipe(res);
	
	}).listen(process.env.PORT);
```

- **Stream y ficheros**
```javascript
    var fs = require('fs');
    
    var lectura = fs.createReadStream('archivo1.txt');
    var escritura = fs.createWriteStream('otroArchivo.txt');
    
    lectura.pipe(escritura);
```


### Variables del Entorno

- Conocer todas las variables disponibles en el entorno
	- Windows: 
	```
		env
	```
	- UNIX: 
	```
		SET
	```

- Guardar nuevas variables en el entorno
	- Windows: 
	```
		SET ALGO='mi secreto'
	```
	- UNIX: 
	```
		export ALGO='mi secreto'
	```
	
- Recuperar las variables con Node.js
	```javascript
		var datoRecuperado = process.env.ALGO;
		console.log(process.env.ALGO);
	```

- Creando variables del entorno limitadas a Node.js y temporales (SOLO UNIX)
	- Arrancando... 	
	```
		NODE_ENV=production node app.js
	```
	- Usando datos...
	```javascript
		if(process.env.NODE_ENV === "production"){
			console.log("Entramos en modo producción");
		} else if (process.env.NODE_ENV === "development"){
			console.log("Entramos en modo desarrollo");
		} else {
			console.log("Entramos en modo desconocido. ¡Revisa las variables del entorno!");
		}
	```	
	
- **Alternativas**
	- [dotenv - librería para Nodejs](https://github.com/motdotla/dotenv)

### Modularización
- Especificación de [CommonJS](https://www.wikiwand.com/en/CommonJS)
- Exports es un objeto que vamos "rellenando"
- La asignacion al exports es inmediata. No se pueden usar callbacks o similares
- No es necesario usar *module.exports* ya es que es global.
	- `var exports = module.exports = {};`
- Es importante controlar la reasignación de *module.exports*

### Modularización: Usando exports

- **Exportar los datos:**
```javascript
// archivo -> config.js

var datoPrivado = "Lo que pasa en Node... se queda en Node";
var datoCompartido = "Hola! desde Config.js"

function privada (){
	return datoPrivado;
}

exports.metodo = function () {
	console.log(datoCompartido);
	console.log(privada());
}
exports.mensaje = datoCompartido;
```

- **Importar los datos:**
```javascript
var config = require('./config');

config.metodo();
console.log(config.mensaje);
```

### Modularización: Usando module.exports

- **Exportar los datos:**
```javascript
// archivo -> config.js
var config = {
  token: "<--- MiSecreto--->",
};

module.exports = config;
```

- **Importar los datos:**
```javascript
var config = require('./config');

console.log(config.token);
```

### NPM

![npm_logo](http://ohdoylerules.com/content/images/npm-logo.svg)

- **Instalar paquetes:**
  - global:
```
    npm install -g <paquete>
```  

  - local:
```
    npm install <paquete>
```    


- **Buscar paquetes**
```
    npm search <paquete>
```

- **Información de los paquetes**
```
    npm view <paquete>
```

- **Lista de paquetes instalados**
```
    npm ls
```

- **Lista de paquetes instalados globalmente**
```
    npm ls -g
```


- **Instalando versiones especificas:**

  - la más reciente:
```  
    npm install <paquete>@latest
```  
  
  - versión especifica:
```  
    npm install <paquete>@1.x (1.xx.xx)
```
  
  - Otra versión especifica
```
    npm install <paquete>@2.10.x (2.10.x)
```

- **Paquetes desactualziados:**
```
  npm outdated
```
  
- **Actualizando paquetes:**
```
  npm update <paquete>
```

- **Desinstalando paquete:**
```
  npm uninstall <paquete>
```

- **Información sobre Bugs**
```
  npm bugs <paquete>
```

- **[Más comandos - CLI](https://docs.npmjs.com/cli/install)**

### Dependency Hell:

**Abyssus abyssum invocat. El abismo llama al abismo.**

- [nipster](http://nipstr.com/)
- [Nodei.co](https://nodei.co/)
- [Dependency Hell](http://www.wikiwand.com/en/Dependency_hell)
- [David Dm](https://david-dm.org/)
   - [Ejemplo Twitter-sentiments](https://david-dm.org/UlisesGascon/twitter-sentiments#info=dependencies&view=list)
   - [Ejemplo Grunt](https://david-dm.org/gruntjs/grunt#info=dependencies&view=table)
   - [Ejemplo Express](https://david-dm.org/strongloop/express)
   - [Ejemplo Bower](https://david-dm.org/bower/bower#info=dependencies&view=table)
- [ShieldsIO](http://shields.io/)
   - [Your Badge Service](http://badges.github.io/gh-badges/) 

### Seguridad:
- [Seguridad](https://nodesecurity.io/resources)
- [Seguridad Avisos](https://nodesecurity.io/advisories)
- [Recursos](https://nodesecurity.io/resources)
- [snyk](https://snyk.io/test)

### package.json

- Datos proyecto
- Tareas
- Dependencias (dependencies y devDependencies)
- **[Documentación](https://docs.npmjs.com/files/package.json)**

- **Creación:**
```
  npm init
```
  
- **Guardar nuevas dependencias:**
```
 npm install <paquete> --save
```

- **Guardar nuevas dependencias (solo para entorno desarrollo):**
```
 npm install <paquete> --save -dev
```

- **Guardando versiones especificas:**
  - (1.xx.xx):
```
  npm install --save <paquete>@1.x
```
  
  - (2.10.x)
```
  npm install --save <paquete>@2.10.x
```
  
  - Latest
```
  npm install --save <paquete>@lastest
```
  
- **Quitando dependencias:**
```
  npm uninstall <paquete> --save
```
  
- **Instalamos las dependencias en el proyecto:**
  - todo:
```
  npm install (todo)
```
  
  - Solo production:
```
  npm install --production (solo producción)
```
  
  - Solo development:
```
  npm install --dev
```

- **[Semantic Versioning](http://semver.org/lang/es/)**
	- Estructura -> X.Y.Z-Extra 
	- Cambio Mayor - *No retrocompatible*
	- Cambio Menor - *Retrocompatible - Nuevas funcionaldiades o cambios*
	- Parche - *Retrocompatible - Solución de errores*
	- Extras - Indicativos o versiones especiales (Beta, Alfa, x86, etc...)

### npm scripts (comandos de CLI)

- **Añadiendo comandos:**

```javascript
  // ...
  "scripts": {
      "test": "npm -v",
      "start": "node -v",
      "hola": "echo 'Hola mundo!'"
  }
  // ...
```
- **Mostrando todos los comandos:**
```
    npm run
```

- **Ejecutando comandos:**
  - test
```
    npm test
```

  - start
```
    npm start
```

  - hola
```
    npm run hola
```  

### Ejercicios

1 - Crearemos varios scripts para automatizar tareas.
- Verificador de versiones para NPM y Nodejs
- Verificador del status de Git
- Descargar (Clonar) Bootstrap de Github
- Descargar (Clonar) nuestro curso de Github
- Emoji al azar con [emoji-random](https://www.npmjs.com/package/emoji-random)

```javascript
  // Tu solución
```


### NVM  (manejando varias versiones de Node)

- **Comrpobando la version de NVM:**
```
    nvm --version
```

- **Instalando una version:**
```
    nvm install 0.12
```

- **Desinstalando una version:**
```
    nvm uninstall 0.12
```

- **Usar una version (globalmente):**
```
  nvm use 0.12
```
  
- **Usando versiones (por proyecto):**
```
    echo 0.12 > .nvmrc
```
  
```
    nvm use
```


### Actualizando Node (método alternativo)
- Sin soporte a Windows
- Instalando el [paquete n](https://www.npmjs.com/package/n)
```
npm install -g n
```
- **Opciones**
```
  n                              Output versions installed
  n latest                       Install or activate the latest node release
  n -a x86 latest                As above but force 32 bit architecture
  n stable                       Install or activate the latest stable node release
  n lts                          Install or activate the latest LTS node release
  n <version>                    Install node <version>
  n use <version> [args ...]     Execute node <version> with [args ...]
  n bin <version>                Output bin path for <version>
  n rm <version ...>             Remove the given version(s)
  n --latest                     Output the latest node version available
  n --stable                     Output the latest stable node version available
  n --lts                        Output the latest LTS node version available
  n ls                           Output the versions of node available
```
