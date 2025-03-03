const mongoose=require("mongoose");
const initdata=require("../init/data.js");
const listing = require("../models/listing.js");
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
   initdata.data= initdata.data.map((obj) => ({ ...obj, owner: "67c3642725ecd3be5eee0ef9" }));
    
    await listing.insertMany(initdata.data);

    console.log("data has been Inserted");
 }
 init()
