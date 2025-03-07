require('dotenv').config()
const express=require("express");
const app=express();
const Router=express.Router();
const listingroute=require("./Routes/listingRoute.js");
const reviewroute=require("./Routes/reviewroute.js");
const userRoute=require("./Routes/userRoute.js");
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const session=require("express-session");
const flash=require("connect-flash");
const user=require("./models/user.js");
const LocalStrategy=require("passport-local");
const passport=require("passport");
const User = require("./models/user.js");






app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))



const mongoose_url="mongodb://127.0.0.1:27017/WanderLust";

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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());    
app.use(flash());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
})

 
app.use("/listings",listingroute);
app.use("/listings",reviewroute);
app.use("/",userRoute);




app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
 
app.use((err,req, res,  next) => {
    let{statusCode=500}=err;
   
    res.status(statusCode).render("listings/error.ejs", { statusCode, err });

})




