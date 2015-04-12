
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
			var promise=$http.get('https://intense-brushlands-2141.herokuapp.com/api/drugs/'+encodeURI(code))
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
