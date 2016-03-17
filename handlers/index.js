var Hapi = require('hapi');
var server = new Hapi.Server();
var testRoute = require('./routes/test') ;

server.register(require('inert')) ;
server.register(require('vision'),(err) => { if(err) { console.log("Error occured, while getting VISION Package ");}}) ;
server.views({
  engines : {
      html : require('handlebars')
    },
   path : 'templates'
  }
)

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
server.route({"path" : "/dir/{path*}" , "method" : "GET", "config" : testRoute.serveDirectory}) ;

server.route({"path" : "/", "method" : "GET", "config" :testRoute.serveView }) ;



server.start(() => {
   console.log("Server stared at " + server.info.uri);
});
