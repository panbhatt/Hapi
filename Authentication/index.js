var Hapi = require('hapi') ;
var server = new Hapi.Server();
var routes = require('./routes') ;
var blipp = require('blipp') ;



server.connection({ 'port' : 3000}) ;

server.bind({
  getRandomNumber : () => { return Math.random() * 10000 ;}
})

// Decorating a server.
server.decorate('reply', 'success', function(obj){
       var newObj = Object.assign({}, obj, { "decorated" : true }) ;
     return this.response(JSON.stringify(newObj)) ;
});


server.route({ "path" : "/globalFunc", "method" : "GET", config : routes.globalFunc}) ;

server.route({ "path" : "/decorate", "method" : "GET", config : routes.decorate}) ;

server.route({"path" : "/validateParam/{age}" , "method" : "GET", config : routes.validateParam }) ;

server.route({"path" : "/login" , "method" : "POST", config : routes.login}) ; 

server.register({ register : blipp , options: {showStart : true} } , (err) => { if(err) {console.log("An Error has occured, while loading blipp "+ err);}}) ;

server.start(() => { console.log("Server started at " + server.info.uri)});
