const Joi = require('joi');
module.exports.listingSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().required(),
            filename:Joi.string()
        }),
    }).required();

 

module.exports.reviewSchema= Joi.object({
   
        comments: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    
    
  
});

        