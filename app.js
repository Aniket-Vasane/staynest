const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.engine("ejs",ejsMate);

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

// index route 
app.get("/listing",async(req,res)=>{
   const allListing =await Listing.find({});
   res.render("listings/index",{allListing});
});

//new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})

app.post("/listing",async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listing");
})
// app.get("/testlisting",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "Cozy Beachside Villa",
//         description: "A beautiful beachside villa with ocean views, private pool, and modern amenities. Perfect for a relaxing getaway.",
//         image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
//         price: 4500,
//         location: "Goa",
//         country: "India"
//     })
//     await sampleListing.save();
//     console.log("Data saved successfully ");
//     res.send("DEmo Data save succssfully");
// })

// edit route
app.get("/listing/:id/edit",async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
})


//show route
app.get("/listing/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

app.put("/listing/:id",async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
})

//DELETE ROUTE
app.delete("/listing/:id",async(req,res)=>{
    const {id} = req.params;
    const deletedlisting =await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listing");
})

app.get("/",(req,res)=>{
    res.send("hello this is demo ");
})

app.listen(port,()=>{
    console.log(`connnect with ${port}`);    
})