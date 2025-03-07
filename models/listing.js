const mongoose=require("mongoose");
const review = require("./review");
const user= require("./user.js")

const { required, string } = require("joi");
const Schema=mongoose.Schema;

const listingschema=new Schema({
    title:{
    type:String,
   
    },
    description:{
      type:String
    },
    image:{
      url:String,
      filename:String,
    },
    price:{
        type:Number
    },
    location:{
          type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    } 
 
 });
 
 listingschema.post('findOneAndDelete', async function (doc) {
   
    if (doc) {
        // `doc` contains the deleted listing
        await mongoose.model('review').deleteMany({
            _id: { $in: doc.reviews }
        });
        // console.log("reviews also has been deleted")
    }
});
const listing=mongoose.model("listing",listingschema);
module.exports=listing;