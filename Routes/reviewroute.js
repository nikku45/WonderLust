const express=require("express");
const app=express();
const router=express.Router();
const listing = require("../models/listing.js");
const review = require("../models/review.js");  
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("../utils/WrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {reviewSchema}=require("../schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))


const validatereview=(req,res,next)=>{

    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}

router.post("/listings/:id/review",validatereview,wrapAsync(async(req,res)=>{
   
    let {id}=req.params;
    let {comments,rating}=req.body;
    let reviewlisting=await listing.findById(id);
    let newreview=new review({comments:comments,rating:rating});
   reviewlisting.reviews.push(newreview);
   await newreview.save();
    await reviewlisting.save();
   req.flash("success","Review has been added");
    res.redirect(`/listings/${id}`);
   
}))
//Delet Review Route
router.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    
    let {id,reviewId}=req.params;
    await review.findByIdAndDelete(reviewId);
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    req.flash("success","Review has been deleted");
    res.redirect(`/listings/${id}`);
}))
module.exports=router;
