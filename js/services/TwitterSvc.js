
testApp.factory('TwitterSvc', function TwitterSvc($http) {
    return {
	getFeed: function() {
	    return $http.get("cgi-bin/testappservice/twitter");
	}
    }
});

