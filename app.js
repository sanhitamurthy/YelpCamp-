var express = require("express");
var app = express();
var rp = require("request-promise");
var request = require("request");
var mongoose= require("mongoose");
var bodyParser =  require("body-parser");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://sanhitab:mongodbpwd@cluster0-s698z.mongodb.net/yelp_camp",{useNewUrlParser: true });


app.get("/",(req,res)=>{
    // res.send("this will be the landing page");
    res.render("landing");
});

app.get("/campgrounds",(req,res)=>{
     Campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampgrounds});
        }    
    });
});

app.post("/campgrounds",(req,res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamp= {name:name, image:image,description:description};
    
    Campground.create(newCamp,(err, newlyCreated)=>{
        if(err){
            console.log("ERROR",err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });       
});

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");
});

app.get("/campgrounds/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        console.log(foundCampground);
        res.render("show",{campground:foundCampground});
    });        
});


app.listen(3000,()=>{
    console.log("Sevrer has started");
});
