var Joi = require('joi') ;



module.exports.globalFunc = {
  "description" : " For binding a function to the globa",
  "handler" : function(req,reply) {
    obj = {  "number" : this.getRandomNumber() } ;
    reply(obj);
  }
};

module.exports.decorate = {
  "description" : " for Decorating the Reply Object ",
  "handler" : function(req,reply) {
  var name = { "name" : "Pankaj Bhatt"} ;
  reply.success(name);
}
};

module.exports.validateParam = {
  "description" : "Verifying the validity of the Params",
  "validate" : {
      params : Joi.object().keys({
          age : Joi.number().required().min(1000).max(2000)
      })
  },
  "handler" : function(req,reply) {
    reply({ "random" : Math.random()}) ;
  }
};

module.exports.login = {
  "description" : " POST body validation",
  "validate" : {
      "payload" : Joi.object().keys({
        "username" : Joi.string().required().min(8)
      })
  },
  handler : function(req,reply) {
    reply.success({});
  }
};
