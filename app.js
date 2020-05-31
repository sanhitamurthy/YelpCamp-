var express = require("express");
var app = express();
var rp = require("request-promise");
var request = require("request");
var bodyParser =  require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


var campgrounds=[
    {name:"Salmon Creek",image:"https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e50744075277cd59f4bcc_340.png"},
    {name:"yellowstone", image:"https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e50744075277cd59f4bcc_340.jpg"},
    {name:"olympic",image:"https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf8525478497d287adc9144_340.jpg"}
]


app.get("/",(req,res)=>{
    // res.send("this will be the landing page");
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new")
});

app.listen(3000,()=>{
    console.log("Sevrer has started");
});
