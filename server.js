var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var app = express();
var Beer = require('./beerModel.js');

var db = process.env.MONGODB_URI || "mongodb://localhost/beers-angular";
mongoose.connect(db);

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SEED

// var beer1 = new Beer({
//   name: '512 IPA', 
//   style: 'IPA', 
//   image_url: 'http://bit.ly/1XtmB4d', 
//   abv: 5,
//   ratingTotal: 5,
//   numberOfRatings: 5
// });

// beer1.reviews.push({text: "This beer is DOPE!", username: "StevenTheScot"});
// beer1.save(function(err, data){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })


//ROUTES

//GET
app.get("/beers", function(req, res){
  Beer.find(function(err, beer){
    if(err){
      console.log(err)
    } else {
      res.send(beer);
    }
  })
});

//CREATE
app.post("/beers", function(req, res){
  var beer = new Beer(req.body);
  beer.save(function(err, beer){
    if(err){
      console.log(err);
    } else {
      res.send(beer);
    }
  })
})

//DELETE
app.delete("/beers/:id", function(req, res){
  Beer.findByIdAndRemove(req.params.id, function(err, beer){
    if(err){
      console.log(err)
    } else {
    res.send("beer removed");
    }
  })
});

//POST RATING(not put because we are using a variable)
app.get("/beers/:id", function(req, res){
  Beer.findById(req.params.id, function(err, beer){
    if(err){
      console.log(err);
    } else {
      res.send(beer);
    }
  })
});

//Update any part of the beer
app.put("/beers/:id", function(req, res){
  var query = {'_id': req.params.id};
  Beer.findByIdAndUpdate(query, req.body, {new: true}, function(err, data){
    if(err){
      console.log(err);
    } else {
      res.send(beer)
    }
  })
})

app.post("/beers/:id/rating", function(req, res){
  //the new rating that the user sent
  var userRating = req.body.rating;
  Beer.findById(req.params.id, userRating, {new: true}, function(err, beer){
    //push the rating that user sent into our model's ratings array
    beer.ratings.push(userRating);
    //save the whole beer model and respond to the client
    beer.save(function(err, beer){
      res.send('i updated the beer!')
    })
  })
})

//post a review per beer
app.post('/beers/:id/reviews', function(req, res) {
  
  Beer.findById(req.params.id).then(function(beer){
    var review = req.body;
    beer.reviews.push(review)
    beer.save(function(err, beer){
      if(err){
        console.log(err);
      } else {
        res.send(beer);
      }
    })
  })
});

//delete a review
app.delete('/beers/:id/reviews/:reviewId', function(req, res){
  Beer.findByIdAndUpdate(req.params.id, {$pull: { "reviews": {_id:req.params.reviewId}}}, function(err, beer){
    if(err){
      console.log(err);
    } else {
      res.send(beer);
    }
  })
})

app.listen(8000, function() {
  console.log("yo yo yo, on 8000!!")
});
