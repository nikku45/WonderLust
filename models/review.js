const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewschema=new Schema({
   comments:{
       type:String,
       required:true
   },
    rating:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
const review=mongoose.model("review",reviewschema);
module.exports=review;