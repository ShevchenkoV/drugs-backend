angular.module('drugs.controllers', ['drugs.services','ngCordova'])

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

.controller('SearchCtrl', function($scope,$state,$cordovaToast,SearchDataService,DetailsService){
  $scope.data={
    results:"",
    search:"",
    queryType:true
  };
  $scope.search=function(){
    if(typeof $scope.data.queryType !== 'undefined'
    && $scope.data.search.length>3){
      SearchDataService.searchByName($scope.data.search,$scope.data.queryType?'name':'ats')
      .then(function(result){
        $scope.data.results=result;
      });
    }
  }
  $scope.typeChange=function(){
    $cordovaToast.showShortCenter( $scope.data.queryType ?
      'Поиск по названию' : 'Поиск по активному веществу')
      .then(function(){
      $scope.search();
    });
  }

  $scope.details=function(item){
    //goto details
    console.log(item);
    DetailsService.save(item);
    $state.go('app.details');
  };

})

.controller('AnalogCtrl', function($scope,analog,SearchDataService) {
  SearchDataService.searchAnalogs(analog).then(function(result){
    $scope.data=result;
  });
})

.controller('DetailsCtrl', function($scope,details) {
  $scope.data=details;
  console.log($scope.data);
});
