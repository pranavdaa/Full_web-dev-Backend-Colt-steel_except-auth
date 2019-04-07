var express = require('express');
var app = express();
var methodOverride = require('method-override');
//var Blog = require('./models/blog')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://localhost/own');

var BlogSchema = new mongoose.Schema({
  title: String,
  image:String,
  created:{type:Date, default:Date.now}

})
var blog = mongoose.model("blog",BlogSchema)
// blog.create(
//   {
//   title: "politics",
//   image:"https://endeavors.unc.edu/wp-content/uploads/Politics-Graphic_Final.jpg",
// },
// function(error,blog){
//   if(error){
//     console.log(error);
//   }
//   else{
//     console.log(blog);
//   }
//
// })

app.get('/blog',(req,res)=>{
blog.find({},(error,blog)=>{
  if(error){
    console.log(error);
  }
  else{
    res.render("index.ejs",{blog:blog})

  }
})
})

app.get('/blog/new',(req,res)=>{
  res.render("new.ejs");
})

app.post("/blog",(req,res)=>{
  var title = req.body.title;
  var image = req.body.image;

  var newblog = {title:title,image:image}
  blog.create(newblog,(error,blog)=>{
  if(error){
    console.log(error);
  }
  else{
    console.log('hi');
    res.redirect("/blog")
  }
  })
})

app.get("/blog/:id",(req,res)=>{
blog.findById(req.params.id,(error,blog)=>{
  if(error){
    console.log(error);
  }
  else{
    res.render("x.ejs",{blog:blog})

  }
})
})

app.get("/blog/:id/update",(req,res)=>{
  blog.findById(req.params.id,(error,blog)=>{
    if(error){
      console.log(error);
    }
    else{
      res.render("updateform.ejs",{blog:blog})
    }
  })
})

app.put("/blog/:id",(req,res)=>{

  blog.findByIdAndUpdate(req.params.id,req.body.blog,(error,blog)=>{
    if(error){
      console.log(error);
    }
    else{
     res.redirect("/blog/"+ req.params.id)
    console.log(blog);
//res.redirect("/blog")
    }
  })
})

app.delete("/blog/:id",(req,res)=>{
  blog.findByIdAndRemove(req.params.id,(error)=>{
    if(error){
      console.log(error);
    }
    else{
      res.redirect("/blog")
    }
  })
//res.send("Deletes")
})
app.get('*',(req,res)=>{
  res.send("You have reached the wrong page");
})

app.listen(4000)
