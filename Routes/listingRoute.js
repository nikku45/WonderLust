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
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingcontroller=require("../controllers/listingcontroller.js");
const { route } = require("./reviewroute.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))





router.get("/new",isLoggedin,(req,res)=>{
    res.render("listings/new.ejs");
})

router.route("/")
.get(listingcontroller.index)
.post(validateListing,wrapAsync(listingcontroller.createnew))

router.get("/:id/edit",isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const flisting= await listing.findById(id);
    if(!flisting){
        req.flash('error', 'Cannot find that listing');
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{flisting});
    }))

router.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(isOwner,isLoggedin,wrapAsync(listingcontroller.updateListing))
.delete(isOwner,isLoggedin,wrapAsync(listingcontroller.destroyListing))






module.exports=router;