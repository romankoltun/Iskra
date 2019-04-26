angular
    .module('events', [])
    .controller('eventCTRL', function($scope, $http) {

        $scope.getAll = function() {
          console.log("getAll");
            $http.get('/getAllEvents')
                .then(function(response) {
                    if (response.data.error == 2) {
                        //if error code is returned from node code, then there are no entries in db!
                        $scope.statustext = "There are currently no products available!";
                    } else {
                      console.log(response);
                        $scope.events = response.data.events;
                        $scope.statustext = "";
                    }
                }), (function(data, status, headers, config) {

                    $scope.statustext = "There was an error fetching data, please check database connection!";
                });
        };

    });
