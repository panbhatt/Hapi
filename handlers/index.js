var Hapi = require('hapi');
var server = new Hapi.Server();
var testRoute = require('./routes/test') ;

server.register(require('inert')) ; 

server.connection({ "port" : 3000}) ;

server.route({
  "path" : "/test",
  "method" : "GET",
  "config" : testRoute.test
})

server.route({
  "path" : "/option/{id*2}/darja" , "method" : "GET", "config" : testRoute.optionalRoute
})

server.route({ "path" : "/file" , "method" : "GET", "config" : testRoute.serveFile}) ;



server.start(() => {
   console.log("Server stared at " + server.info.uri);
});
