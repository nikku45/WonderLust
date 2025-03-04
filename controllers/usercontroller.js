const user=require("../models/user")
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    res.redirect(res.locals.nextpath ||"/listings");
}

module.exports.signup=(req,res)=>{
    let{email,username,password}=req.body;
    let newuser=new User({email,username});
    User.register(newuser,password,(err)=>{
        if(err){
            req.flash("error",err.message);
            res.redirect("/signup");
        }else{
            req.login((newuser),(err)=>{
                if(err){
                    console.log(err);
                }else{
                    req.flash("success","Welcome to WanderLust");
                    res.redirect("/listings");
                }
            })
           
        }
})
}


module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash("success","Logged out successfully");
            res.redirect("/listings");
        }
    });
    
}