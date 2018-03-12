app.controller('beerCtrl', function ($scope, $stateParams, beerFactory) {
  if (!$stateParams.beerParam) {
    beerFactory.getBeer($stateParams.id)
      .then(function (beer) {
        $scope.beer = beer;
      })
  } else {
    $scope.beer = $stateParams.beerParam;
  }

  $scope.addReview= function(review){
    alert('yo')
    beerFactory.addReview($stateParams.id, review)
      .then(function (beer_from_db) {
      $scope.beer.reviews = beer_from_db.reviews
    })
  }


})