angular.module('drugs.controllers', ['drugs.services'])

.controller('AppCtrl', function() {
  
})

.controller('FavoritesCtrl', function($scope) {
  $scope.favorites = [
    { title: 'Анальгин', id: 1 },
    { title: 'Тироксин', id: 2 },
    { title: 'Но-шпа', id: 3 },
    { title: 'Корвалол', id: 4 }
  ];
})

.controller('FavoritCtrl', function($scope, $stateParams) {
})

.controller('SearchCtrl', function($scope,SearchDataService){
  $scope.search=function(){
    SearchDataService.getQuery($scope.data.search).then(function(result){
      $scope.data.results=result;
      console.log(result);
    });
  }
});
