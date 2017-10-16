app.factory('beerFactory', function ($http) {

    var beerFactory = {};

    beerFactory.getBeers = function () {
        return $http.get('/beers')
        .then(function(response){
           return angular.copy(response.data); 
        });
    };

    beerFactory.addBeer = function (newBeer) {
        console.log(newBeer)
        return $http.post('/beers', newBeer)
        .then(function(response){
            console.log(response.data)
            return response.data
        })
    };

    beerFactory.removeBeer = function (id) {
        var id = id.beer._id
        console.log(id)
        // console.log(id.beer._id)
        return $http.delete('/beers/' + id)
        .then(function(response){
            console.log(response.data)
            return(response.data);
        })
    };

    return beerFactory;
});


// app.factory('beerFactory', function ($http) {
//     //Get Beers Function
//     var getBeers = function (beers) {
//         return $http.get('/beers')
//         .then(function(response){
//            return angular.copy(response.data); 
//         });
//     };

//     //Create Beer Function
//     var addBeer = function () {

//     };

//     //Remove Beer Function
//     var removeBeer = function () {

//     };

//     return {
//         addBeer: addBeer,
//         removeBeer: addBeer,
//         getBeers: getBeers
//     }

// })