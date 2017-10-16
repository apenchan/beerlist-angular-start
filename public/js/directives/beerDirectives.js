app.directive('beerDirective', function () {
	return {
		templateUrl: './js/allBeers.html',
		bindings: {
			beers: '=myBeers'
		}
	}
})