const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/staynest";

main()
.then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(Mongo_URL);
}

app.get("/testlisting",async(req,res)=>{
    let sampleListing = new Listing({
        title : "Cozy Beachside Villa",
        description: "A beautiful beachside villa with ocean views, private pool, and modern amenities. Perfect for a relaxing getaway.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        price: 4500,
        location: "Goa",
        country: "India"
    })
    await sampleListing.save();
    console.log("Data saved successfully ");
    res.send("DEmo Data save succssfully");
})

app.get("/",(req,res)=>{
    res.send("hello this is demo ");
})

app.listen(port,()=>{
    console.log(`connnect with ${port}`);    
})