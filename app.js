const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();
const items = ["Study", "Sleep", "College"];
const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req,res){
    
    let day = date.getDate();
    res.render("lists", {listTitle: day, newListItems: items});
    
});

app.post("/", function(req,res){

    console.log(req.body);


    let item = req.body.listItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item); 
        res.redirect("/");
    }
   
});

app.get("/work", function(req, res){
    
    res.render("lists", {listTitle: "Work List", newListItems: workItems})

});

app.get("/about", function(req, res){
    res.render("about");
});




app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});