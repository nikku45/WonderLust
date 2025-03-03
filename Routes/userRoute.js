const express=require("express");
const app=express();
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const {setnextpath}=require("../middleware.js");
const wrapAsync = require("../utils/WrapAsync.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash("success","Logged out successfully");
            res.redirect("/listings");
        }
    });
    
})

//login route
router.get("/login",(req,res)=>{
   res.render("users/Login.ejs");
 })
router.post("/login",
    setnextpath,
    passport.authenticate("local",
    {failureFlash:true,failureRedirect:"/login"}),
    wrapAsync(async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    res.redirect(res.locals.nextpath ||"/listings");
}))


//signUp route
router.get("/signup",(req,res)=>{
    res.render("users/SignUp.ejs");
})

router.post("/signup", (req, res) => {
    let { email, username, password } = req.body;
    let newuser = new User({ email, username });
    User.register(newuser, password, (err) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/signup");
        } else {
            req.login(newuser, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success", "Welcome to WanderLust");
                    res.redirect("/listings");
                }
            });
        }
    });
});

module.exports=router;