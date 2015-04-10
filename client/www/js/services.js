
angular.module('drugs.services', [])

.service('SearchDataService', function($q, $timeout,$http) {

	return {
		getQuery : function(query){
			//http://192.168.0.105 "ionic run -l" for device testing
			var promise=$http.get('http://localhost:8080/api/find/'+encodeURI(query))
			.then(function(response){
				return response.data;
			})
			return promise;
		}
	}

});
