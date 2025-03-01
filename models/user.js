const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passport=require("passport-local-mongoose");
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})
userSchema.plugin(passport);
const user=mongoose.model("user",userSchema);
module.exports=user;

