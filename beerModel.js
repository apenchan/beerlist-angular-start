var mongoose = require("mongoose");


var reviewSchema = new mongoose.Schema({
    text: {type: String},
    username: {type: String}
});

var beerSchema = new mongoose.Schema({
    name: { type: String },
    style: { type: String },
    image_url: { type: String },
    abv: { type: Number },
    ratings: [{type: Number}],
    ratingTotal: { type: Number },
    numberOfRatings: { type: Number },
    reviews: [reviewSchema]
  });

//   var reviewSchema = new mongoose.Schema({
//       text: {type: String},
//       username: {type: String}
//   });

  var Beer = mongoose.model("Beer", beerSchema);
  
  module.exports = Beer;


