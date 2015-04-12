
angular.module('drugs.services', [])

.service('SearchDataService', function($q, $timeout,$http) {

	return {
		searchByName : function(query,str){
			//http://192.168.0.105 "ionic run -l" for device testing
			//http://localhost:8080 for ionic serve

			var promise=$http.get('https://intense-brushlands-2141.herokuapp.com//api/find?'+str+'='+encodeURI(query))
			.then(function(response){
				return response.data;
			})
			return promise;
		}
	}

})

.service('DetailsService', function(){
	return{
		data:[],
		save:function(item){
			this.data=item;
		},
		get:function(){
			return this.data;
		}
	}
});
