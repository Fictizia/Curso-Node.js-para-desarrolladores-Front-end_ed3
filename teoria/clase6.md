# Clase 6

### Firebase

![FirebaseLogo](http://julian-vega.co/images/fulls/2016-01-16/firebase-logo.jpg)

- [Firebase Pricing](https://www.firebase.com/pricing.html)
- [Firebase Features](https://www.firebase.com/features.html)
- [Firebase Docs](https://www.firebase.com/docs/)
- [Firebase - Backbone](https://www.firebase.com/docs/web/libraries/backbone/quickstart.html)
- [Firebase - Angular](https://www.firebase.com/docs/web/libraries/angular/quickstart.html)
- [Firebase - Nodejs/js](https://www.firebase.com/docs/web/quickstart.html)

**Ejemplos**

- [Firebase - Open Data Sets](https://www.firebase.com/docs/open-data/)
- [Firebase - Cryptocurrencies](https://www.firebase.com/docs/open-data/cryptocurrencies.html)
  - [Bitcoin Price Ticker con Arduino](https://github.com/UlisesGascon/Bitcoin-price-ticker-with-Arduino)
- [Firebase - Parking](https://www.firebase.com/docs/open-data/parking.html)
- [Firebase - Bus](https://www.firebase.com/docs/open-data/transit.html)
- [Firebase - Weather](https://www.firebase.com/docs/open-data/weather.html)
- [Raspberrypi system info data to Firebase](https://github.com/UlisesGascon/raspberrypi-system-info-data-to-firebase)


**Primeros pasos**

- Crear una cuenta:
  - [SignUp](https://www.firebase.com/signup/)
  
- Gestionar dependéncias en cliente:
```javascript
  <script src="https://cdn.firebase.com/js/client/2.2.9/firebase.js"></script>
```

- Gestionar dependéncias en Nodejs:
```
  npm install firebase -save
```


**Limitaciones**

- [Limitaciones técnicas](https://www.firebase.com/docs/web/guide/understanding-data.html#section-limitations)
- [Conversión de Arrays](https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase)


**Guardando Datos**

- [Guardando datos en Firebase](https://www.firebase.com/docs/web/guide/saving-data.html#section-ways-to-save)
- set() Almacena / remplaza los datos
- update() Actualiza los datos
- push() Alamacena los datos con un ID único.
- transaction() Para datos complejos y cocurridos.




- set():

```javascript
  var ref = new Firebase("https://<<---URL--->>.firebaseio.com/fb-ejemplos/escritura");
  var usersRef = ref.child("users");
  usersRef.set({
    alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });
```

```javascript
  var ref = new Firebase("https://<<---URL--->>.firebaseio.com/fb-ejemplos/escritura");
  usersRef.child("alanisawesome").set({
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  });
  usersRef.child("gracehop").set({
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  });
```


- update():

```javascript
  var hopperRef = usersRef.child("gracehop");
  hopperRef.update({
    "nickname": "Amazing Grace"
  });
```

- push():

```javascript
// update y Callback
  var dataRef = ref.child("IDs");
  dataRef.push("Guardando datos...", function(error) {
    if (error) {
      console.warn("No se han podido guardar los datos." + error);
    } else {
      console.info("Datos guardados con exito.");
    }
  });
```

- **[Demo](https://codepen.io/ulisesgascon/pen/pyYYoR)**


**Eventos**

- Evento (value):

```javascript
  var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
  
  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("Fallo en lectura de datos: " + errorObject.code);
  });
```


- Evento (child_changed):

```javascript
  var ref = new Firebase("https://<<--URL-->>.firebaseio.com/fb-ejemplos/escritura/users");
  
  ref.on("child_changed", function(snapshot) {
    var usersData = snapshot.val();
    console.log("Nuevos cambios(child_changed): ", usersData);
  });
```


- Evento (child_removed):

```javascript
  var ref = new Firebase("https://<<--URL-->>.firebaseio.com/fb-ejemplos/escritura/users");
  
  ref.on("child_removed", function(snapshot) {
    var usersData = snapshot.val();
    console.log("Usuario eliminado(child_removed): ", usersData);
  });
```


- once() *una vez*:

```javascript
var ref = new Firebase("https://<<--URL-->>.firebaseio.com/fb-ejemplos/escritura/users");

ref.once("child_changed", function(snapshot) {
  var usersData = snapshot.val();
  console.log("Nuevo cambio(once - child_changed): " + usersData);
});
```


- Quitar evento (value):

```javascript
  ref.off("value");
```

- Quitar todos los eventos:

```javascript
  ref.off();
```

- **[Demo](https://codepen.io/ulisesgascon/pen/grEEeP)**


**Queries**

- orderByChild() Ordenar por hijo
- orderByKey() Ordenar por Llave
- orderByValue() Ordenar por valor
- orderByPriority() Ordenar por prioridad
- Documentación
  - [Firebase - Queries Part I](https://www.firebase.com/blog/2013-10-01-queries-part-one.html)
  - [Firebase - Queries Part II](https://www.firebase.com/blog/2014-01-02-queries-part-two.html)
  - [Firebase - Denormalizing is normal](https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html)
  - [Firebase Docs - Ordenando Datos](https://www.firebase.com/docs/web/guide/retrieving-data.html#section-ordered-data)



- orderByChild():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByChild("height").on("child_added", function(snapshot) {
    console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
  });
```

- orderByKey():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByKey().on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```

- orderByValue():

```javascript
  var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");
  scoresRef.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      console.log("The " + data.key() + " dinosaur's score is " + data.val());
    });
  });
```

- **[Demo](https://codepen.io/ulisesgascon/pen/dMrrgb)**

**Queries Avanzadas**

- limitToFirst() desde el primero...
- limitToLast() desde el final...
- startAt() empiezan por...
- endAt() terminan por...
- equalTo() igual a...


- limitToFirst():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByChild("height").limitToFirst(2).on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```


- limitToLast():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByChild("weight").limitToLast(2).on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```


**Queries Avanzadas (concatenando)**

- .orderByValue() y .limitToLast():

```javascript
  var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");
  scoresRef.orderByValue().limitToLast(3).on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      console.log("The " + data.key() + " dinosaur's score is " + data.val());
    });
  });
```


- .orderByChild() y .startAt():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByChild("height").startAt(3).on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```


- .orderByKey() y .endAt():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```


- .startAt() y .endAt() *usando tilde*:

```javascript
var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
ref.orderByKey().startAt("b").endAt("b~").on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
```

- .equalTo():

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
    console.log(snapshot.key());
  });
```


- Ejemplo: *Busquemos un dinosaurio que sea mas pequeño que un Stegosaurus*

```javascript
  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
  ref.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
    var favoriteDinoHeight = stegosaurusHeightSnapshot.val();
  
    var queryRef = ref.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2)
    queryRef.on("value", function(querySnapshot) {
        if (querySnapshot.numChildren() == 2) {
          // Data is ordered by increasing height, so we want the first entry
          querySnapshot.forEach(function(dinoSnapshot) {
            console.log("el dinosaurio más pequeño que el Stegosaurus es " + dinoSnapshot.key());
  
            // Returning true means that we will only loop through the forEach() one time
            return true;
          });
        } else {
          console.log("El Stegosaurus es el dinosaurio más pequeño");
        }
    });
  });
```

- **[Demo](https://codepen.io/ulisesgascon/pen/qZvvve)**

**Trabajar Offline**

- [Documentación](https://www.firebase.com/docs/web/guide/saving-data.html#section-writes-offline)


- Realizando acciones al desconectarse:

```javascript
  var presenceRef = new Firebase('https://<<--URL-->>.firebaseio.com/info/connectednow');
  presenceRef.onDisconnect().set("I disconnected!");
  
```



**Social Login**

- [User-auth con Firebase](https://www.firebase.com/docs/web/guide/user-auth.html)
- [Ejemplo en jsfiddle](http://jsfiddle.net/firebase/a221m6pb/embedded/result,js,css/)


**Seguridad y Autorización**

- [Ajustes de seguridad](https://www.firebase.com/docs/security/guide/securing-data.html)


**Deploy**

- [Deploy en Cloud](https://www.firebase.com/docs/web/guide/deploying.html)
- [Deploy usando Node](https://www.firebase.com/docs/hosting/quickstart.html)




### Analicemos Código

- [Código Fuente demo de Velocidad](https://github.com/UlisesGascon/raspberrypi-system-info-data-to-firebase)


### [Nuevo Firebase 3.x](https://firebase.google.com/)

![new_logo](http://cdn772.swedroid.se/wp-content/uploads/2016/05/google-firebase-logo-600x308.png)
![funcionalidades](https://cdn.scotch.io/1/Bg4r7dI1Q2W3bX9Sf4oD_unnamed.png)

**Más info**
- [Firebase expands to become a unified app platform](https://firebase.googleblog.com/2016/05/firebase-expands-to-become-unified-app-platform.html)
- [MIgration guide](https://firebase.google.com/support/guides/firebase-web)


**Claves del cambio**
- Nueva Interfaz
- Muchas funcionalidades Nuevas
- Un enfoque amplio a desarrollo de apps nativas (Android e iOS)
- Existe un asistente para migrar los proyectos a la nueva consola
- Los nuevos proyectos ya no componen el nombre del dominio

### Migración de FIrebase 2.x a 3.x

**Nueva versión de las librerías**
- Cliente
```html
  <!-- Antes -->
  <script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
  <!-- Ahora -->
  <script src="https://www.gstatic.com/firebasejs/3.0.4/firebase.js"></script>
```

- NPM
```
  npm uninstall firebase --save
  npm install firebase --save
```

**Obtener una referencia de la base de datos**
- Antes
```javascript
  var ref = new Firebase("https://databaseName.firebaseio.com");
```

- Ahora
```javascript
// See https://firebase.google.com/docs/web/setup#project_setup for how to auto-generate this config
  var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com"
  };
  
  firebase.initializeApp(config);
  
  var rootRef = firebase.database().ref();
```


**Los métodos de obtención sin argumento son propiedades solo de lectura**
- Antes
```javascript
// Reference
  var key = ref.key();
  var rootRef = ref.root();
  var parentRef = ref.parent();

// Query
  var queryRef = query.ref();

// DataSnapshot
  ref.on("value", function(snapshot) {
    var dataRef = snapshot.ref();
    var dataKey = snapshot.key();
  });
```

- Ahora
```javascript
// Reference
  var key = ref.key;
  var rootRef = ref.root;
  var parentRef = ref.parent;

// Query
  var queryRef = query.ref;

// DataSnapshot
  ref.on("value", function(snapshot) {
    var dataRef = snapshot.ref;
    var dataKey = snapshot.key;
  });
```


**Actualización de tu código de autenticación**
- Antes
```javascript
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      // An error occurred
      console.error(error);
    } else {
      // User signed in!
      var uid = authData.uid;
    }
  });
```

- Ahora
```javascript
  var auth = firebase.auth();
  
  var provider = new firebase.auth.TwitterAuthProvider();
  auth.signInWithPopup(provider).then(function(result) {
    // User signed in!
    var uid = result.user.uid;
  }).catch(function(error) {
    // An error occurred
  });
```


**Obtener el token de acceso**

- Antes
```javascript
  ref.onAuth(function(authData) {
    if (authData) {
      var accessToken = authData.providerData[authData.provider].accessToken;
    }
  });
```

- Ahora
```javascript
  var auth = firebase.auth();
  
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(function(result) {
    var accessToken = result.credential.accessToken;
  });
```


**Controlar el estado de autenticación**

- Antes
```javascript
  ref.onAuth(function(authData) {
    if (authData) {
      // User signed in!
      var uid = authData.uid;
    } else {
      // User logged out
    }
  });
```

- Ahora
```javascript
  var auth = firebase.auth();
  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User signed in!
      var uid = user.uid;
    } else {
      // User logged out
    }
  });
```


### Ejercicios

**1 -** Crea un nuevo formulario que nos permita registrarnos en Firebase.

Objetivos:
- Comprobar si ese mismo usuario ya esta registrado (Email como ID), para evitar multiples inscripciones.
- Incluiremos en la página los usuarios que se van sumando.

```javascript
  // Tu solución
```

**2 -** Partiendo del ejercicio anterior... realizaremos un nuevo formulario que nos permita registrarnos usando nuestra cuenta de Github.

- Objetivos Opcionales:
  - Subir los datos proporcionados por Github a nuestra base de datos.
  - Incluir parte de los datos como el avatar y el nombre del usuario en el html 

- Documentación:
  - [GitHub User Authentication](https://www.firebase.com/docs/web/guide/login/github.html)

```javascript
  // Tu solución
```

**3 -** Partiendo del ejercicio primer ejercicio... realizaremos un nuevo formulario que nos permita almacenar información adiccional en Firebase usando la [API de FullContact](https://www.fullcontact.com/developer/).

- Objetivos Opcionales:
  - Subir los datos originales y los proporcionados por FullContact a nuestra base de datos.
  - Incluir una lógica en el HTML para pintar los usuarios en función de los datos existentes.
    - Más enriquecidos (avatar, localización, etc...)
    - Más básico (Datos proporcionados originalmente)

- Documentación:
  - [FullContact by Email](https://www.fullcontact.com/developer/docs/email/)

```javascript
  // Tu solución
```

### Express

![Express_logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)

**Influencias / usos**
- Otros frameworks similares:
  - Zend (PHP)
  - Django (Python)
  - Sinatra (Ruby)

- Uso:
  - API JSON
  - Single Pages
  - App tiempo real

**Pros**
- Rutas
- Parámetros
- Formularios y subida de ficheros
- Cookies
- Sesiones
- Templates

**Contras**
- Base de datos / ORM
- Autenticación de usuarios
- Seguridad
- Migraciones
- Deployment
- Organización del código

**Migraciones**
- [De Express 3.x a Express 4.x](http://expressjs.com/es/guide/migrating-4.html)
  - [Documentación de la 3.x (desuso)](http://expressjs.com/es/3x/api.html)
  - [Cambios](http://expressjs.com/es/guide/migrating-4.html)
  - [Nuevas funcionaldiades](https://github.com/expressjs/express/wiki/New-features-in-4.x?_ga=1.226364894.554285759.1461232316)
- [De Express 4.x a Express 5.x (hoy es Alpha)](http://expressjs.com/es/guide/migrating-5.html)
  - [Cambios Previstos](https://github.com/expressjs/express/pull/2237?_ga=1.29731835.554285759.1461232316)


**Instalación**

- Instalación Global:
  ```
  npm install -g express
  ```

- Instalación versiones anteriores:
  ```
  npm install -g express@3.x
  ```

**Hola Mundo**
  ```javascript
  var express = require('express');
  var app = express();
  
  // C9
  var puerto = process.env.PORT || 3000;
  
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });
  
  app.listen(puerto, function () {
    console.log('Example app listening on port ' + puerto);
  });
```

**Generador de Express**

- Instalación global del generador
  ```
  npm install express-generator -g
  ```

- Opciones de instalación
  ```
  express -h
  ```

- Generar un proyecto
  ```
  express <nombre_proyecto>
  ```

- Entramos en la carpeta e instalamos las dependencias
  ```
  cd <nombre_proyecto> && npm install
  ```

- Estructura de un Proyecto (MVC)
  ```
  ├── app.js (Nuestra aplicación - módulo)
  ├── bin (Gestión de la aplicación)
  │   └── www
  ├── package.json (Información y dependencias)
  ├── public (Nuestros estáticos)
  │   ├── images
  │   ├── javascripts
  │   └── stylesheets
  │       └── style.css
  ├── routes (Nuestros controladores)
  │   ├── index.js
  │   └── users.js
  └── views (Nuestras vistas/plantillas)
      ├── error.jade
      ├── index.jade
      └── layout.jade
  ```

- Ejecutando la aplicación:
  - Windows
    ```
      set DEBUG=<nombre_proyecto>:* & npm start
    ```
  - MacOS/Linux
    ```
      DEBUG=<nombre_proyecto>:* npm start
    ```

- Opcional: [Volviendo el arranque al estilo Express 3.x](http://expressjs.com/es/guide/migrating-4.html#app-gen)

**Partes Claves**
- [express()](http://expressjs.com/es/4x/api.html#express)
- [Application](http://expressjs.com/es/4x/api.html#application)
- [Request](http://expressjs.com/es/4x/api.html#request)
- [Response](http://expressjs.com/es/4x/api.html#response)
- [Router](http://expressjs.com/es/4x/api.html#router)


**Mecánica: app.set()**
- Nos permite establecer la configuración de Express
- Podemos almacenar datos personalizados de manera global
- Ejemplos
  - Guardando la versión
  ```javascript
    app.set('version', '1.5.0');
    app.get('version'); // 1.5.0
  ```
  - Maneras de Habilitar contenido
  ```javascript
    app.enable('dia_soleado'); // igual a -> app.set('dia_soleado', true);
    app.enabled('dia_soleado'); // igual a -> app.get('dia_soleado') === true;
    app.disabled('dia_soleado'); // igual a -> app.get('dia_soleado') === false;
  ```  
  - Definiendo el puerto
  ```javascript
    app.set('port', process.env.PORT || 3000);
  ```
  - Configuraciones según el entorno
    - Para todos los entornos 
    ```
      NODE_ENV=production node app.js
    ```
    ```javascript
      app.configure(function(){
        app.set('estado_aplicacion', '*');
      });
    ```
    - Solo desarrollo
    ```
      NODE_ENV=development node app.js
    ```
    ```javascript
      app.configure('development', function(){
        app.set('estado_aplicacion', 'development');
      });
    ```
    - Solo producción
    ```
      NODE_ENV=production node app.js
    ```
    ```javascript
      app.configure('production', function(){
        app.set('estado_aplicacion', 'production');
      });
    ```
    - Solo personalizado
    ```
      NODE_ENV=personalizado1 node app.js
    ```
    ```javascript
      app.configure('personalizado1', function(){
        app.set('estado_aplicacion', 'personalizado1');
      });
    ```
  - Motores de Plantillas
    - Variables locales (solo disponibles para las plantillas)
    ```javascript
      // Guardando
      app.locals.title = 'My App';
      app.locals.email = 'me@myapp.com';
      
      // Usando
      app.locals.title // My App
      app.locals.email // me@myapp.com
    ```
    - Definiendo el sistema de plantillas que usaremos
    ```javascript
      // npm install jade --save
      var express = require('express');
      var jade = require('jade');
      var app = express();
        
      app.set('view engine', 'jade');
      
      app.get('/', function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!'});
      });
    ```

- [Comparativa de Motores de plantillas](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)


**Mecánica: app.all(), app.get(), app.post(), app.put(), app.delete(), app.route()**
```javascript
  app.METODO(Ruta, Manejador)
```
- Estructura
  - app *Instanciado de express*
  - METODO *[Metodo HTTP](https://www.wikiwand.com/es/Hypertext_Transfer_Protocol) de la Ruta*
    - Soportados: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search y connect.
    - Para todas las rutas usamos *app.all()*
  - Ruta *Ruta (url) donde se aplica*
    - Podemos usar
      - Series
      - Patrones de Series (Subtipo de Regex)
        - Reducido a los subconjuntos ?, +, *, y ()
      - [Expresiones regulares](https://regex101.com/)
  - Manejador *La función que será llamada cuando se alcance la ruta con el método/s correctos/s*
    - Se puede usar funciones individuales
    - Se pueden hacer matrices de funciones
    - Se pueden mezclar matrices y funciones individuales
    - Argumentos:
      - Obj Request de Node.js
      - Obj Response de Node.js
      - next() *Función que dispara el siguiente middleware*

- Métodos HTTP: delimitando a un único método
```javascript
  app.get('/', function (req, res, next) {
    res.send('Solo get como método me vale...');
  });
```

- Métodos HTTP: Otra forma de delimitar a un método 
```javascript
  app['m-search']('/', function (req, res, next) {
    res.send('Solo m-search como método me vale...');
  });
```

- Métodos HTTP: permitiendo todos los métodos
```javascript
  app.all('/', function (req, res, next) {
    res.send('Cualquier método me vale...');
  });
```

- Rutas: Raiz http://localhost:8080/
```javascript
  app.get('/', function (req, res, next) {
    res.send('Esto es la Raiz');
  });
```
- Rutas: Básicas http://localhost:8080/hola
```javascript
  app.get('/hola', function (req, res, next) {
    res.send('Esto es /hola');
  });
```
- Rutas: Capturando Parámetros http://localhost:8080/hola/Eduardo, http://localhost:8080/hola/Oscar...
```javascript
  app.get('/hello/:nombre', function(req, res) {
      res.send('Hola ' + req.nombre + '!');
  });
```
- Rutas: Capturando varios parámetros http://localhost:8080/desde/Madrid/a/Malga, http://localhost:8080/desde/Madrid/a/NYC
```javascript
    app.get('/desde/:origen/a/:destino', function(req,res,next){
      res.send('Quieres ir de ' + req.params.origen + ' a ' + req.params.destino);
    });
```
- Rutas: Capturando varios parámetros y alguno determiando http://localhost:8080/mensaje/1/editar, http://localhost:8080/mensaje/500/borrar...
```javascript
    app.get('/mensaje/:id/:accion(editar|borrar)', function(req,res,next){
      res.send('Quieres ' + req.params.accion + ' el mensaje numero ' + req.params.id);
    });
```
- Rutas: Parámetros opcionales http://localhost:8080/user/1/editar, http://localhost:8080/user/500/borrar...
```javascript
  app.get('/user/:id/:comando?', function(req,res,next){
    if(req.params.comando){
      res.send("Tenemos algo! Quieres " + req.params.comando);
    } else {
      res.send("Nada de nada...");
    }
  });
```
- Rutas: Más parámetros opcionales http://localhost:8080/user/1.pdf, http://localhost:8080/user/500.zip, etc...
```javascript
  app.get('/user/:id.:formato?', function(req,res,next){
    if(req.params.formato){
      res.send("["+req.params.formato+"] Extensión requerida... ");
    } else {
      res.send("Sin Extensión requerida");
    }
  });
```
- Rutas: Tipo fichero http://localhost:8080/hola.text
```javascript
  app.get('/hola.text', function (req, res) {
    res.send('Hola');
  });
```
- Rutas: Patrones de serie (?) *http://localhost:8080/acd o http://localhost:8080/abcd*
```javascript
  app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
  });
```
- Rutas: Patrones de serie (+) *http://localhost:8080/abcd, http://localhost:8080/abbbbbcd, etc...*
```javascript
  app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
  });
```
- Rutas: Patrones de serie (*) *http://localhost:8080/abcd, http://localhost:8080/abAALGOOOcd, etc...*
```javascript
  app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
  });
```
- Rutas: Patrones de serie (()) *http://localhost:8080/abe o http://localhost:8080/abcd*
```javascript
  app.get('/a(bc)d', function(req, res) {
    res.send('a(bc)d');
  });
```
- Rutas: Expresiones regulares *http://localhost:8080/mcfly, http://localhost:8080/dragonfly, etc...*
```javascript
  app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
  });
```
- Rutas: Molularidad con app.route()
```javascript
  app.route('/pelicula')
    .get(function(req, res) {
      res.send('todas las peliculas...');
    })
    .post(function(req, res) {
      res.send('Añadir una pelicula...');
    })
```

- Manejadores: Función individual
```javascript
  app.get('/example/a', function (req, res) {
    res.send('Hola desde A!');
  });
```

- Manejadores: Dos funciones individuales
```javascript
  app.get('/example/b', function (req, res, next) {
    console.log('La respuesta se enviará a la siguiente función...');
    next();
  }, function (req, res) {
    res.send('Hola desde B!');
  });
```

- Manejadores: Matrices
```javascript
  var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
  }
  
  var cb2 = function (req, res) {
    res.send('Hola desde C!');
  }
  
  app.get('/example/c', [cb0, cb1, cb2]);
```

- Manejadores: Matrices y funciones individuales
```javascript
  var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
  }
  
  app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('La respuesta se enviará a la siguiente función...');
    next();
  }, function (req, res) {
    res.send('Hola desde D!');
  });
```

- Manejadores: Objeto petición
  - req.ip *Almacena la IP desde donde se realizó la peticioón*
  - req.is *Que tipo de datos nos llegan desde la petición. Booleano*
  ```javascript
    req.is('json');
    req.is('application/*');
    req.is('application/json');
  ```
  - req.params *Contenido de la ruta (http://localhost:8080/usuarios/:id)*
  - req.query *Contenido de la consulta de la URL (http://localhost:8080/peliculas?categoria=Ficcion&director=George+Lucas)*
    - simples (http://localhost:8080/peliculas?categoria=Ficcion&director=George+Lucas):
    ```javascript
    app.get('/peliculas', function(req,res,next){
      console.log(req.query.director) // George Lucas
      console.log(req.query.categoria) // Ficcion
    });
    ```
    - Agrupados (http://localhost:8080/peliculas?categoria[tipo]=Corto&director=Yo+Mismo):
    ```javascript
    app.get('/peliculas', function(req,res,next){
      console.log(req.query.director) // Yo Mismo
      console.log(req.query.categoria.tipo) // Corto
    });
    ```
  - req.body *Contenido dentro de la propia petición*

- Manejadores: Métodos de respuesta
  - [res.download()](http://expressjs.com/es/4x/api.html#res.download) *Solicita un archivo para descargarlo.*
  - [res.end()](http://expressjs.com/es/4x/api.html#res.end) *Finaliza el proceso de respuesta.*
  - [res.json()](http://expressjs.com/es/4x/api.html#res.json) *Envía una respuesta JSON.*
  - [res.jsonp()](http://expressjs.com/es/4x/api.html#res.jsonp) *Envía una respuesta JSON con soporte JSONP.*
    - Valores por defecto ajustables en app.set()
      - *?callback=* valor por defecto en la petición
      - `res.jsonp({date: newDate()});`
  - [res.redirect()](http://expressjs.com/es/4x/api.html#res.redirect) *Redirecciona una solicitud.*
  - [res.render()](http://expressjs.com/es/4x/api.html#res.render) *Renderiza una plantilla a la que le pasa además datos (opcional)*
  - [res.send()](http://expressjs.com/es/4x/api.html#res.send) *Envía una respuesta de varios tipos.*
    - Muy flexible
      - Código y contenido `res.send(404,'Oops...');`
      - Enviar un JSON `res.send({mensaje: "secreto"});`
      - Solo código (autocompleta el mensaje) `res.send(200);` 


  - [res.sendFile()](http://expressjs.com/es/4x/api.html#res.sendFile) *Envía un archivo para ser visualizado.*
  - [res.sendStatus()](http://expressjs.com/es/4x/api.html#res.sendStatus) *Envía un archivo para ser descargado.*


**Mecánica: app.use()**
- Usando Middleware: app.use(middleware)
  - Declaración directa 
  ```javascript
    app.use(function(req, res, next) {
        console.log("Petición en "+req.url+" con el método" + req.method);
        next(); 
    });
  ```
  - Enlazando
  ```javascript
    var express = require('express');
    var app = express();
    
    function chivato (req, res, next) {
        console.log("Nueva petición en "+req.url+" con el método" + req.method);
        next(); 
    };
    
    app.use(chivato);

    app.get('/', function (req, res) {
      res.send('Hola a todos!');
    });
    
    app.listen(3000);    
  ```

**Middleware: La clave**

![Mw_schema](http://image.slidesharecdn.com/introtonode-140914093424-phpapp01/95/intro-to-nodejs-14-638.jpg?cb=1410687757)

Una función que recibe 3 o 4 parámetros: req, res, next

- Tipos:
  - Middleware de nivel de aplicación
  - Middleware de nivel de direccionador
  - Middleware de manejo de errores
  - Middleware incorporado
  - Middleware de terceros

- Concatenación:
  - Al terminar su tarea, tiene que invocar a next()


**Middleware de nivel de aplicación**
- Global *Afecta a cualquier Ruta*
```javascript
  var app = express();
  
  app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
```

- Punto de Montaje *Afecta solo a una vía de acceso, en este caso /user/:id*
```javascript
  var app = express();
  
  app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
  }, function (req, res, next) {
    res.send('User Info');
  });
```

**Middleware de nivel de direccionador**
- Global *Afecta a cualquier Ruta*
```javascript
  var app = express();
  var router = express.Router();
  
  router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
```

- Punto de Montaje *Afecta solo a una vía de acceso, en este caso /user/:id*
```javascript
  var app = express();
  var router = express.Router();
  
  router.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
  }, function (req, res, next) {
    res.send('User Info');
  });
```


**Middleware de manejo de errores**
- Argumento adiccional
```javascript
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  
  app.use(gestionErrorServer);
  
  function gestionErrorServer(err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' });
    } else {
      res.status(500);
      res.render('error', { error: err });
    }
  }
  
  //...
```


**Middleware incorporado**
- Desde la versión 4.x Express no depende de [Connect](https://github.com/senchalabs/connect)
- Solamente queda incorporado [express.static](https://github.com/expressjs/serve-static)
  - Incluyendo archivos estáticos
  ```javascript
    app.use(express.static('public'));
  ```
  - Configurando la carpeta pública
  ```javascript
    var options = {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      index: false,
      maxAge: '1d',
      redirect: false,
      setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
      }
    }
    
    app.use(express.static('public', options));
  ```
  - Usando múltiples directorios estáticos
  ```javascript
    app.use(express.static('public'));
    app.use(express.static('uploads'));
    app.use(express.static('files'));
  ```


- Middleware oficial (No incorporado):
  - [serve-favicon](https://github.com/expressjs/serve-favicon)
    - Sirve el favicon
  - [Morgan](https://github.com/expressjs/morgan)
    - Logger para peticiones HTTP
  - [body-parser](https://github.com/expressjs/body-parser)
    - Decodifica:
      - application/json
      - application/x-www-form-urlencoded
      - multipart/form-data
    - Crea el objeto req.body con los parámetros
    - Crea el objeto req.files con los ficheros que se han subido desde un formulario
  - [basic-auth-connect](https://github.com/expressjs/basic-auth-connect)
    - Protección básica de las rutas usando usuario y contraseña
  - [csurf](https://github.com/expressjs/csurf)
    - Crea *req.session._csrf* 
    - Protección contra Cross-site request forgery
    - Usando tokens
  - [cors](https://github.com/expressjs/cors)
    - Gestión de Cross Origin Resource Sharing (CORS)
  - [compression](https://github.com/expressjs/compression)
    - [gzip](https://www.wikiwand.com/es/Gzip)
  - [express-session](https://github.com/expressjs/session)
    - Simple gestor de sesiones 
  - [multer](https://github.com/expressjs/multer)
    - *Node.js middleware for handling `multipart/form-data`.*
  - [cookie-session](https://github.com/expressjs/cookie-session)
    - *Simple cookie-based session middleware*
  - [cookie-parser](https://github.com/expressjs/cookie-parser)
    - *cookie parsing middleware*
    - Crea req.cookies
  - [cookie-session](https://github.com/expressjs/cookie-session)
    - Inicializa y parsea los datos de sesión del usuario
    - Utilizando cookies como almacenamiento
    - Algunas opciones avanzadas
  - [serve-static](https://github.com/expressjs/serve-static)
    - *Serve static files*
    - ¡Muy útil! Se pone cerca del final
    - Cachea los ficheros
    - La variable global __dirname contiene el directorio donde reside el script en ejecución
  - [vhost](https://github.com/expressjs/vhost)
    - Virtual Domain Hosting
  - [restful-router](https://github.com/expressjs/restful-router)
    - *Simple RESTful url router.*
  - [connect-markdown](https://github.com/expressjs/connect-markdown)
    - *Auto convert markdown to html for connect.*

**Middleware: Más Middleware, más funcionalidad**
- [La lista de Raynos](https://github.com/Raynos/http-framework/wiki/Modules)

- Habilitando CORS
```javascript
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
```

- Baneando Navegadores (IE8 y anteriores)
```javascript
  // banear.js
  var banned = [ 'MSIE', 'Trident/6.0'];
  
  module.exports = function(){ 
    return function(req, res, next) {
      if (req.headers['user-agent'] !== undefined && req.headers['user-agent'].indexOf(banned) > -1) {
              res.end('Navegador no compatible');
      } else { 
        next(); 
      } 
    }
  };
```


- Mapeado de parámetros en rutas.
  - Cuidado con app.param()
    - Funcionamiento (orden de busqueda):
      - req.params
      - req.body
      - req.query
```javascript
  app.param('id_usuario',function(req,res,next,id){
    // Llamamos a una función que valida....
    validadorUsuario(id, function(err, usuario){
      if (err) { 
        next(err);
      } else if (user) { 
        // Actualizamos con los nuevos datos
        req.params.usuario = usuario; 
        // damos paso a la siguiente función
        next();
      } else {
        next(new Error('Error al cargar el usuario'));
      } 
    });
  });
```

-  Redireccionando al usuario en caso de no estar logados
```javascript
  module.exports = function(req,res){
    if (req.params.usuario.logged){
      next();
    } else {
      res.redirect('/login');
    }
  };
```

- Gestion de errores tipo 4xx y tipo 5xx
```javascript
// Error 404
app.use(function(req, res) {
  res.status(400);
  res.render('404', { title: '404 - No encontrado' });
});

// Error 500 (solo en caso de desarrollo)
app.use('development', function(error, req, res, next) {
  res.status(500);
  res.render('500', {
  title: 'Jefe, ¡Tenemos un 500!',
  error: error
  });
});


// Error 500 (solo en caso producción)
app.use('production', function(error, req, res, next) {
  res.status(500);
  res.render('500', {
  title: 'Oops… ¡Algo salió mal!'
  });
  // Mandamos un email con los datos al equipo.
});
```

**[Ejemplos con Express](https://github.com/expressjs/express/tree/master/examples)**





**Express en resumen**

- GET Básico
  ```
  app.get('/hola', function(req, res){
      res.send('hemos abierto una nueva ruta!');
  });
  ```

- POST Básico
  - app.js 
  ```
  app.post('/', function(req, res){
    res.send(req.body);
  });
  ```

  - index.jade 
  ```
  section.container
  h1 Manda tu mensaje!

  form(method='post', action='/')
    fieldset
      legend Mandame tu mensaje:
      p.contenido
        label Tu mensaje
        input(name='mensaje')
      p.acciones
        input(type='submit', value='Enviar')
  ```

  - respuesta 
  ```javascript
  {
    "mensaje": "Hola Cracks!"
  }
  ```


- Parámetros en las rutas
  - app.js 
  ```javascript
  app.get('/hola/:usuario', function(req, res){
      res.send('Hola '+req.params.usuario+'. Hemos abierto una nueva ruta personalizada!');
  });
  ```

- Simulando una respuesta de una base de datos en las rutas:

  - app.js 
  ```javascript
  app.get('/consulta/:usuario', function(req, res){
      var datos = {
          marca: "Seat",
          modelo: "Ibiza",
          edad: 20,
          ITVPasada: true,
          seguroPasado: true
      };
      
      res.render('consulta.jade', {usuario: req.params.usuario, datos: datos});
  });
  ```

  - consulta.jade 
  ```
.datos
  h3 Datos: 
  p= "El Coche de "+usuario+" es un "+datos.marca+" "+datos.modelo
    
  h3 Detalles técnicos:
  ul
      li= "ITV en regla: " +datos.ITVPasada 
      li= "seguro en regla: " +datos.seguroPasado
  ```

**Utilidades**

- Recuperar cabeceras:
  ```
  curl -I 127.0.0.1:3000
  ```
- [PostMan](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- [Html2Jade](http://html2jade.org/)



### PUG (antes Jade)

![Jade_logo](https://css-tricks.com/wp-content/uploads/2016/01/jade-logo-1.png)

**[Jade... ya no se llama jade. Ahora se llama PUG](https://github.com/pugjs/pug/issues/2184)**

![PUG_logo](https://camo.githubusercontent.com/be9ed9b1e0a28a074109fc994da6d00c1d8cd6e6/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f336561326433613836633632323730323064643562323037343361356161343538383038636134652f5356472f5f5f7075672d6c6f676f2d636f6c6f75722d776964652e737667)

**Implementaciones en otros lenguajes**
- [php](https://github.com/kylekatarnls/jade-php)
- [scala](https://scalate.github.io/scalate/documentation/scaml-reference.html)
- [ruby](https://github.com/slim-template/slim)
- [python](https://github.com/SyrusAkbary/pyjade)
- [java](https://github.com/neuland/jade4j)


- **Entendiendo la mécanica**
  - index.jade:
  ```
  doctype html
  html(lang="en")
    head
      title= pageTitle
      script(type='text/javascript').
        if (foo) {
           bar(1 + 5)
        }
    body
      h1 Jade - node template engine
      #container.col
        if youAreUsingJade
          p You are amazing
        else
          p Get on it!
        p.
          Jade is a terse and simple
          templating language with a
          strong focus on performance
          and powerful features.
  ```
  
  - index.html:
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Jade</title>
      <script type="text/javascript">
        if (foo) {
           bar(1 + 5)
        }
      </script>
    </head>
    <body>
      <h1>Jade - node template engine</h1>
      <div id="container" class="col">
        <p>You are amazing</p>
        <p>
          Jade is a terse and simple
          templating language with a
          strong focus on performance
          and powerful features.
        </p>
      </div>
    </body>
  </html>
  ```
  
- Bootstrap:
  - index.jade:
  ```
  doctype html
  html
    head
      title title
      include ./includes/styles.jade
    body
      .row
        .container
          .jumbotron
            h1 Hola, desde Bootstrap!
            p ¿Qué te parece?
            p
              a.btn.btn-primary.btn-lg(href='http://getbootstrap.com/', role='button') Aprende más!
      include ./includes/scripts.jade
  ```
  - includes/styles.jade
  ```
  //- includes/styles.jade
  // Bootstrap
  link(rel='stylesheet', href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css')
  ```
  - includes/scripts.jade
  ```
  //- includes/scripts.jade
  // Jquery
  script(src='//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js')
  // Bootstrap
  script(src='//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js')
  
  ```
  - index.html
  ```
  <!DOCTYPE html>
  <html>
      <head>
          <title>title</title>
          <!-- Bootstrap-->
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
          </head>
          <body>
              <div class="row">
                  <div class="container">
                      <div class="jumbotron">
                          <h1>Hello, desde Bootstrap!</h1>
                          <p>¿Qué te parece?</p>
                          <p>
                              <a href="http://getbootstrap.com/" role="button" class="btn btn-primary btn-lg">Aprende más!</a>
                          </p>
                      </div>
                  </div>
              </div>
              <!-- Jquery-->
              <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
              <!-- Bootstrap-->
              <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
          </body>
      </html>
  ```

- [Jade en Github](https://github.com/jadejs/jade)
- [Jade en CLI](http://jade-lang.com/command-line/)
- [Jade API](http://jade-lang.com/api/)
- [Jade Language Ref](http://jade-lang.com/reference/)



### Ejercicios

**1 -** Crearemos una aplciación usando Firebase y Express para gestionar las peliculas que nos gustan.

- Objetivos:
    - Crear un APIRest para poder gestionar la aplicación desde otros dominios
    - Habilita CORS para la API
    - Utiliza JADE para gestionar las vistas de tu aplicación
    - Crea módulos para gestionar las rutas
    - Enriquece los datos facilitados por el usuario con la [API de OMBD](http://omdbapi.com/)
    - Guardate una copia de las portadas de las peliculas y sirvelas en la carpeta de los archivos estáticos para evitar el error 403 de IMBD

- **[Solución](https://github.com/UlisesGascon/Simple-API-REST-with-Firebase-and-IMBD/releases/tag/v1.0.0)**