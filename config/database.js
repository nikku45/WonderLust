// const mongoose = require('mongoose');
// require('dotenv').config();
// const username = encodeURIComponent("nitinrajput0093");
// const password = encodeURIComponent("93687332");

// const connectDB = async () => {
//   try { 
//     mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.qfdlc.mongodb.net/wanderlust?retryWrites=true&w=majority`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected...');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };


// module.exports = connectDB;

// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://username:password@cluster0.qfdlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);
