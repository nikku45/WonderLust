const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing = require("./modules/listing");
const review = require("./modules/review");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/WrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



const mongoose_url="mongodb://127.0.0.1:27017/WanderLust";

//validating schema with joi from schema.js
const validateListing=(req,res,next)=>{
    console.log("Inside the middleware")
    console.log(req.body);
    const {error}=listingSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}
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

//home route
app.get("/",(req,res)=>{
    res.send("Hey! Welcome to WonderLust");
})
//showing all listings
app.get("/listings",async (req,res)=>{
    let alllistings=await listing.find();
   
    res.render("listings/index.ejs",{ alllistings });
})
//create route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
app.post("/listing",validateListing,wrapAsync(async(req,res,next)=>{
     ;
     
        let newlisting=new listing(req.body)
        let result=await newlisting.save()
       
        
        res.redirect("/listings");
}))

//showing details of listing
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let { id }=req.params;
    console.log(id);
    let flisting=await listing.findById(id).populate("reviews");
    // console.log(findedlisting);
   res.render("listings/show.ejs",{flisting});
}))

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const flisting= await listing.findById(id);
    res.render("listings/edit.ejs",{ flisting });
}))
//update route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let {description,price}=req.body;
     await listing.findByIdAndUpdate(id,{description:description,price:price});
     console.log("details has been updated");
     res.redirect(`/listings/${id}`);
    

}))
//------------------------------------------

//delet route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
 
   await listing.findByIdAndDelete(id);
   
    res.redirect("/listings");
     
}))
/*Review*/
//review route
app.post("/listings/:id/review",validatereview,wrapAsync(async(req,res)=>{
   
    let {id}=req.params;
    let {comments,rating}=req.body;
    let reviewlisting=await listing.findById(id);
    let newreview=new review({comments:comments,rating:rating});
   reviewlisting.reviews.push(newreview);
   await newreview.save();
    await reviewlisting.save();

    res.redirect(`/listings/${id}`);
   
}))
//Delet Review Route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    
    let {id,reviewId}=req.params;
    await review.findByIdAndDelete(reviewId);
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    res.redirect(`/listings/${id}`);
}))

//error handling
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
 
app.use((err,req, res,  next) => {
    let{statusCode=500}=err;
   
    res.status(statusCode).render("listings/error.ejs", { statusCode, err });

})

//connecting db
main().then(()=>{
console.log("database connected");
})
.catch((err)=>{
console.log(err);
})
async function  main(){
   await mongoose.connect(mongoose_url);
}

app.listen(8080,()=>{
    console.log("server is listening on port:8080");

})