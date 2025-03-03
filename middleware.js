// Description: This file contains the middleware functions for the application.
const Listing=require("./models/listing.js")
const Review=require("./models/review.js")
const flash=require("connect-flash")

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

const setnextpath = (req, res, next) => {
    console.log("setnextpath",req.session.nextpath);
    if(req.session.nextpath){
     res.locals.nextpath = req.session.nextpath;
     console.log("res.locals.nextpath",res.locals.nextpath);
    }
    
    next();
   
}

const isOwner=async(req,res,next) => {
    let id=req.params;
    let listing=await Listing.findById(id);
    if(!res.locals.currentUser.equals(listing._id)){
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
module.exports = { isLoggedin, setnextpath ,isOwner};