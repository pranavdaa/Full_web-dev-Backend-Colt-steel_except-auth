var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title: String,
  image:String,
  created:{type:Date, default:Date.now}

})

module.export = mongoose.model("blog",BlogSchema)
