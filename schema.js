const Joi = require('joi');
module.exports.listingSchema= Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image:Joi.object({
            filename:Joi.string().required(),
            url:Joi.string().required()
        }).required()
      
    }).required()
    
  
});
module.exports.reviewSchema= Joi.object({
   
        comments: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    
    
  
});

        