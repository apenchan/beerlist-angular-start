var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'mainCtrl',
        templateUrl: 'home.html'
      })
      .state('beer', {
        url: '/beer/:id',
        controller: 'beerCtrl',
        templateUrl: 'beers.html',
        params: {
            beerParam: null
          }
      })
      .state('beer.reviews',{
          url: '/reviews',
          controller: 'beerCtrl',
          templateUrl: 'beer-review-form.html',
          params: {
            reviewParam: null
        }
      })
  
    $urlRouterProvider.otherwise('/home');
  }]);