const mongoose=require("mongoose");
const review = require("./review");

const { required } = require("joi");
const Schema=mongoose.Schema;

const listingschema=new Schema({
    title:{
    type:String,
   
    },
    description:{
      type:String
    },
    image:{
       
        
        filename:{
            type:String
        },
        url:{
            type:String,
            default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fhouse%2F&psig=AOvVaw0TXiQXCW-EjdNTabMhwcma&ust=1729247981124000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiqv_CclYkDFQAAAAAdAAAAABAE",
            set:(v)=>
            v===""?"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60":v,
        }
      

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
    ]   
 
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