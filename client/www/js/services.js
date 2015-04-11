
angular.module('drugs.services', [])

.service('SearchDataService', function($q, $timeout,$http) {

	return {
		searchByName : function(query,str){
			//http://192.168.0.105 "ionic run -l" for device testing
			//http://localhost:8080 for ionic serve
			var promise=$http.get('http://192.168.0.105:8080/api/find?'+str+'='+encodeURI(query))
			.then(function(response){
				return response.data;
			})
			return promise;
		}
	}

});
