
testApp.controller('MapCtrl', function($scope, $timeout, $compile, MapSvc) {
    $scope.posObjs = [];
    $scope.loadMap = function() {
	$scope.map = new Microsoft.Maps.Map(document.getElementById('mapArea'), {
	    credentials: '8jAEzAezLG2umUpneTEv~pSp6mZZwdOU6_10ikbEoxQ~AikBzekhfv-t3ZkNOcD6GAwKvaC6GY1HMr87OE4FeCiOQN0pSX5-cWnP5dMMAbY4',
	    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
	    zoom: 2
        });

	$scope.map.setOptions({
            maxZoom: 2,
            minZoom: 2
        });

	$timeout($scope.getIss, 100);
    };

    // Store this in a property and we could have the user set it if needed
    $scope.issInt = 5000;
    $scope.getIss = function() {
	MapSvc.getIss().success(function(data) {
	    $scope.issLoc = data;
	    $scope.setIssLoc();
	});
	
	$timeout($scope.getIss, $scope.issInt);
    };

    $scope.setIssLoc = function() {
	$scope.posObjs.push(angular.copy($scope.issLoc.iss_position));

	$scope.removeIss();

	var iss = $scope.createIss($scope.issLoc.iss_position, 15, 'rgba(0, 0, 255, 0.8)');
	$scope.map.entities.push(iss);

	$scope.centerMap();
	$scope.createLine();
    }

    $scope.createIss = function(location, radius, fillColor, strokeColor, strokeWidth) {
	strokeWidth = strokeWidth || 0;

	var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
		   '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
		   (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '" />',
		   '<text x="50%" y="50%" text-anchor="middle" stroke="#fff" stroke-width="2px" dy=".3em">ISS</text></svg>'];

	return new Microsoft.Maps.Pushpin(location, {
	    icon: svg.join(''),
	    anchor: new Microsoft.Maps.Point(radius, radius)
	});
    }

    $scope.centerMap = function() {
	$scope.map.setView({
	    center: new Microsoft.Maps.Location($scope.issLoc.iss_position.latitude, $scope.issLoc.iss_position.longitude)
	});
    }

    $scope.removeIss = function() {
	for (var i = $scope.map.entities.getLength() - 1; i >= 0; i--) {
            var iss = $scope.map.entities.get(i);
            if (iss instanceof Microsoft.Maps.Pushpin) {
		$scope.map.entities.removeAt(i);
            }
	}
    }

    $scope.createLine = function(location, radius, fillColor, strokeColor, strokeWidth) {
	var line = [];
	for (var i = 0; i < $scope.posObjs.length; i++) {
	    line.push(new Microsoft.Maps.Location($scope.posObjs[i].latitude, $scope.posObjs[i].longitude));
	}

	var polyline = new Microsoft.Maps.Polyline(line, { strokeColor: 'green', strokeThickness: 5 });

	$scope.map.entities.push(polyline);
    }
});
