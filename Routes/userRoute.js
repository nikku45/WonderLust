const express=require("express");
const app=express();
const router=express.Router();
const User=require("../models/user.js");
const { route } = require("./listingRoute");
const passport=require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//login route
router.get("/login",(req,res)=>{
   res.render("users/Login.ejs");
 })
router.post("/login",passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    res.redirect("/listings");
})
//signUp route
router.get("/signup",(req,res)=>{
    res.render("users/SignUp.ejs");
})

router.post("/signup",(req,res)=>{
    let{email,username,password}=req.body;
    let newuser=new User({email,username});
    User.register(newuser,password,(err)=>{
        if(err){
            req.flash("error",err.message);
            res.redirect("/signup");
        }else{
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        }
})




})
module.exports=router;