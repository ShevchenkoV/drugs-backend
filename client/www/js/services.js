
angular.module('drugs.services', [])

.service('SearchDataService', function($http,$q) {
	function normalize(element, index, array) {
	  element.min=parseFloat(element.min.replace(",", "."));
		element.max=parseFloat(element.max.replace(",", "."));
	}
	return {
		searchAnalogs : function(code){
			var deffered = $q.defer();
			$http.get('https://intense-brushlands-2141.herokuapp.com/api/analog/'+encodeURI(code))
			.then(function(response){
				response.data.forEach(normalize);
				deffered.resolve(response.data);
				console.log(response.data);
			})
			return deffered.promise;
		}
	}

})

.service('DetailsService', function($localstorage){
	return{
		data:[],
		save:function(item){
			this.data=item;
			$localstorage.set('lastSearch',item);
		},
		get:function(){
			return this.data;
		}
	}
})
.service("friendService",function( $http, $q ) {
 // Return the public API.
 return({
     cancel: cancel,
     getFriends: getFriends
 });

 function cancel( promise ) {
     if (promise && promise._httpTimeout && promise._httpTimeout.resolve) {
         promise._httpTimeout.resolve();
     }
 }
 function getFriends(query,str) {
     var httpTimeout = $q.defer();
     var request = $http({
         method: "get",
         url: 'https://intense-brushlands-2141.herokuapp.com/api/find?'+str+'='+query,
         timeout: httpTimeout.promise
     });
     var promise = request.then( unwrapResolve );
     promise._httpTimeout = httpTimeout;
     return( promise );
 }

 function unwrapResolve( response ) {
     return( response.data );
 }
}
)

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
