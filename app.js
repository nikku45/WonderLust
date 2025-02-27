const express=require("express");
const app=express();
const Router=express.Router();
const listingroute=require("./Routes/listingRoute.js");
const reviewroute=require("./Routes/reviewroute.js");
const mongoose=require("mongoose");
const listing = require("./modules/listing");
const review = require("./modules/review");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/WrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");




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

app.use("/",listingroute);
app.use("/",reviewroute);




app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
 
app.use((err,req, res,  next) => {
    let{statusCode=500}=err;
   
    res.status(statusCode).render("listings/error.ejs", { statusCode, err });

})




