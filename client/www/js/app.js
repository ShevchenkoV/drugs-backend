
angular.module('drugs', ['ionic', 'drugs.controllers','leaflet-directive'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: "SearchCtrl"
      }
    }
  })
  .state('app.details', {
    url: "/details",
    views: {
      'menuContent': {
        templateUrl: "templates/details.html",
        controller: 'DetailsCtrl',
        resolve: {
          details: function(DetailsService) {
            return DetailsService.get();
          }
        }
      }
    }
  })

  .state('app.analog', {
    url: "/analog/:code",
    views: {
      'menuContent': {
        templateUrl: "templates/analog.html",
        controller: 'AnalogCtrl',
        resolve: {
          analog: function($stateParams) {
            return $stateParams.code ;
          }
        }
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        controller: 'MapCtrl',
        templateUrl: "templates/map.html"
      }
    }
  })
    .state('app.favorites', {
      url: "/favorites",
      views: {
        'menuContent': {
          templateUrl: "templates/favorites.html",
          controller: 'FavoritesCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/favorites/:itemId",
    views: {
      'menuContent': {
        templateUrl: "templates/favorit.html",
        controller: 'FavoritCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/favorites');
});
