
testApp.directive('twitterFeed', function(TwitterSvc) {
    return {
	restrict: 'E',
	templateUrl: 'templates/feed.html',
	replace: true,
	link: function ($scope, element, attrs) {
	    $scope.getFeed = function() {
		TwitterSvc.getFeed().success(function(data) {
		    $scope.statuses = data.statuses;
		});
	    };

	    $scope.formatDate = function(sDate) {
		return new Date(sDate);
	    };

	    $scope.getFeed();
	}
    }
});
