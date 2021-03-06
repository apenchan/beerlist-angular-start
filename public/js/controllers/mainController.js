app.controller('mainCtrl', function ($scope, beerFactory) {

	$scope.beers = [];
	// $scope.beers.reviews = [];

	$scope.addBeer = function (beer) {
		beerFactory.addBeer(beer)
			.then(function (data) {
				$scope.beers.push(data)
			})
	};

	$scope.removeBeer = function (index) {
		beerFactory.removeBeer(this)
			.then(function (data) {
				$scope.beers.splice(index, 1)
			})
	}

	beerFactory.getBeers().then(function (beers) {
		$scope.beers = beers;
	})
		.catch(function (error) {
			console.log(error)
		});

	$scope.addReview = function (index, review) {
		console.log(review)
		beerFactory.addReview(this.beer._id, review)
			.then(function (data) {
				$scope.beers[index] = data;
				// $scope.beers[index].reviews.push(review);
				console.log(data)
			})
	}

});

// app.controller('mainCtrl', function($scope, beerFactory){
//     $scope.getBeers = beerFactory.getBeers;

//     $scope.showBeer = beerFactory.showBeer;

//     $scope.addBeer = beerFactory.addBeer;

//     $scope.removeBeer = beerFactory.removeBeer;

// })