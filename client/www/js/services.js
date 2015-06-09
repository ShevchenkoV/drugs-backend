
angular.module('drugs.services', [])

.service('SearchDataService', function($http) {

	return {
		searchByName : function(query,str){
			console.log(str);
			var promise=$http.get('https://intense-brushlands-2141.herokuapp.com/api/find?'+str+'='+encodeURI(query))
			.then(function(response){
				return response.data;
			})
			return promise;
		},
		searchAnalogs : function(code){
			console.log('wtf');
			var promise=$http.get('https://intense-brushlands-2141.herokuapp.com/api/analog/'+encodeURI(code))
			.then(function(response){
				return response.data;
			})
			return promise;
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
