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
const {isLoggedin}=require("../middleware.js")
const reviewcontroller=require("../controllers/reviewcontroller.js")

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

router.post("/:id/review",isLoggedin,validatereview,wrapAsync(reviewcontroller.addreview))
//Delet Review Route
router.delete("/:id/reviews/:reviewId",wrapAsync(reviewcontroller.deletreview))
module.exports=router;
