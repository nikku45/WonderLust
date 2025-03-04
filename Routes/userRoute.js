const express=require("express");
const app=express();
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const {setnextPath}=require("../middleware.js");
const wrapAsync = require("../utils/WrapAsync.js");
const usercontroller=require("../controllers/usercontroller.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



router.route("/login")
.get((req,res)=>{
    res.render("users/Login.ejs");
  })
.post(setnextPath,
    passport.authenticate
    ("local",{failureFlash:true,failureRedirect:"/login"}),
    wrapAsync(usercontroller.login))


router.route("/signup")
.get((req,res)=>{
    res.render("users/SignUp.ejs");
})
.post(usercontroller.signup)

router.get("/logout",usercontroller.logout);

module.exports=router;