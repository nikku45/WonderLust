const listing = require("../models/listing");
const review=require("../models/review")

module.exports.addreview=async(req,res)=>{
    let { id }=req.params;
    let { comments,rating  }=req.body;
    let reviewlisting=await listing.findById(id);
    let newreview=new review({comments:comments,rating:rating});
    newreview.author=req.user;
    reviewlisting.reviews.push(newreview);
   await newreview.save();
    await reviewlisting.save();
   req.flash("success","Review has been added");
    res.redirect(`/listings/${id}`);
   
}

module.exports.deletreview=async(req,res)=>{
    
    let {id,reviewId}=req.params;
    await review.findByIdAndDelete(reviewId);
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    req.flash("success","Review has been deleted");
    res.redirect(`/listings/${id}`);
}