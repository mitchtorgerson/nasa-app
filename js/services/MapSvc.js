
testApp.factory('MapSvc', function MapSvc($http) {
    return {
	getIss: function() {
	    return $http.get("cgi-bin/testappservice/iss");
	}
    }
});
