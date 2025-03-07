// Description: This file contains the middleware functions for the application.
const Listing=require("./models/listing.js")
const Review=require("./models/review.js")
const flash=require("connect-flash")
const { listingSchema } = require("./schema.js")


function isLoggedin(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("req.originalUrl",req.originalUrl);
        req.session.nextpath = req.originalUrl;
        console.log("req.session.nextpath",req.session.nextpath);
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    res.locals.currentUser = req.user; 
    next();
}

const setnextPath = (req, res, next) => {
    console.log("setnextpath",req.session.nextpath);
    if(req.session.nextpath){
     res.locals.nextpath = req.session.nextpath;
     console.log("res.locals.nextpath",res.locals.nextpath);
    }
    
    next();
   
}


const isOwner=async(req,res,next) => {
    let { id }=req.params;
    let listing=await Listing.findById(id);
    if(!(res.locals.currentUser.equals(listing.owner._id))){
      req.flash('err','you are not allowed to make changes in this listing')
      res.redirect("/listing/id")
    }
    next();
}
// const isAuthor=async(req,res,next)=>{
//     console.log("middleware called")
//     let {reviewId}=req.params;
//     let review=await Review.findById(reviewId).populate('author'); // Populate author
   
//     if(!res.locals.currentUser.equals(review.author._id)){
//         req.flash('err','you are not allowed to delete this review');
//         return res.redirect(`/listings/${req.params.id}`);
//     }
//     next();
// }
const validateListing=(req,res,next)=>{
    console.log("Inside the middleware")
    console.log(req.body);
    const {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}
module.exports = { isLoggedin, setnextPath ,isOwner,validateListing};