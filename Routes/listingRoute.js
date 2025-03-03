const express=require("express");
const app=express();
const router=express.Router();
const listing = require("../models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("../utils/WrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema}=require("../schema.js");
const {isLoggedin,isOwner,isAuthor}=require("../middleware.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



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



//home route
router.get("/",(req,res)=>{
    res.send("Hey! Welcome to WonderLust");
})
//showing all listings
router.get("/listings",async (req,res)=>{
    let alllistings=await listing.find();
   
    res.render("listings/index.ejs",{ alllistings });
})
//create route
router.get("/listings/new",isLoggedin,(req,res)=>{
    res.render("listings/new.ejs");
})
router.post("/listing",validateListing,wrapAsync(async(req,res,next)=>{
     
     
        let newlisting=new listing(req.body)
        newlisting.owner=req.user._id;
        let result=await newlisting.save()
       
        req.flash('success', 'New Listing has been added');

        res.redirect("/listings");
}))

//showing details of listing
router.get("/listings/:id",wrapAsync(async(req,res)=>{
    let { id }=req.params;
    console.log(id);
    let flisting=await listing.findById(id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate("owner");
    if(!flisting){
        req.flash('error', 'Cannot find that listing');
        return res.redirect("/listings");
    }   
    // console.log(findedlisting);
   res.render("listings/show.ejs",{flisting});
}))

//edit route
router.get("/listings/:id/edit",isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const flisting= await listing.findById(id);
    if(!flisting){
        req.flash('error', 'Cannot find that listing');
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{flisting});
    }))
//update route
router.put("/listings/:id",isOwner,isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let {description,price}=req.body;
     await listing.findByIdAndUpdate(id,{description:description,price:price});
     console.log("details has been updated");
     req.flash('success', 'Listing has been updated');
     res.redirect(`/listings/${id}`);
    

}))
//------------------------------------------

//delet route
router.delete("/listings/:id",isOwner,isLoggedin,wrapAsync(async(req,res)=>{
    let{id}=req.params;
 
   await listing.findByIdAndDelete(id);
   req.flash('success', ' Listing has been deleted')
    res.redirect("/listings");
     
}))




module.exports=router;