
function testAuthentication(req,reply)
{
  var isAuthenitcated = true;
  console.log("Finishing Authentication");
  return reply(isAuthenitcated) ;
}


function testAuthorization(req,reply)
{
  var isAuthorized = true;
  console.log("Finishing Authorization");
  return reply(isAuthorized) ;
}

module.exports.test = {
    "description" : "function to suppor the temp thing",
    "pre" : [
        { method : testAuthentication, assign : 'isAuthenitcated' } ,
        { method : testAuthorization , assign : 'isAuthorized'},
    ],
    "handler" : function(request, reply) {
      console.log("Starting processing ... ") ;
      console.log("Authenticated = " , request.pre.isAuthenitcated + " Authroized = " , request.pre.isAuthorized) ;
      var respObj = {
          "status" : "success",
          "id" : Math.random() * 10,
          "authenticated" : request.pre.isAuthenitcated,
          "authorized" : request.pre.isAuthorized
      };

      console.log("Finishing the code and returing the object. \n ******************************************** ") ;
      reply(respObj);
    }
};

module.exports.optionalRoute =  {
   description : "Handling the optional Route",
   handler : function(req,reply) {
     console.log(req.params.id);
       var obj = { "id" : req.params.id, "name" : "Pankaj Bhatt"};
       reply(obj);
   }

};

module.exports.serveFile = {
  description : "Handling the serving of the file ",
  handler : {
              file : {
                  "path" : __dirname + "/../routes/abc.txt"
                }
          }
};
