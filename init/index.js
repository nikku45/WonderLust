const mongoose=require("mongoose");
const initdata=require("../init/data.js");
const listing = require("../modules/listing.js");
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

 const init=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);

    console.log("data has been Inserted");
 }
 init()
