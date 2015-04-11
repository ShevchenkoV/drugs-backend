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

.controller('SearchCtrl', function($scope,$state,SearchDataService,DetailsService){
  $scope.data={
    results:"",
    search:"",
    queryType:true
  };
  $scope.search=function(){
    if($scope.data.queryType){
      SearchDataService.searchByName($scope.data.search,'name').then(function(result){
        $scope.data.results=result;
      });
    }
    else{
      SearchDataService.searchByName($scope.data.search,'ats').then(function(result){
        $scope.data.results=result;
      });
    }
  }

  $scope.details=function(item){
    console.log(item);
    DetailsService.save(item);
    $state.go('app.details');
  };

})

.controller('DetailsCtrl', function($scope,details) {
  $scope.data=details;
  console.log($scope.data);
});
