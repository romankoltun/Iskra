angular
    .module('app')
    .controller('profile-controller', function($scope, $http) {

        $scope.loginModel = {
            username: '',
            password: '',
            email: ''
        };
        $scope.getUserInfo = function() {
            $http.get('/views/profile')
                .then(function(response) {
                  $scope.loginModel = response.data.user[0];
                  $scope.statustext = "";
                        console.log(response.data);
                }), (function(data, status, headers, config) {

                    $scope.statustext = "There was an error fetching data, please check database connection!";
                })
        };
    });
