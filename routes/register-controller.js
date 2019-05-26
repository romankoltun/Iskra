angular
    .module('app')
    .controller('register-controller', function($scope, $http) {

        $scope.loginModel = {
            username: '',
            password: '',
            email: '',
            notifications: true
        };

        $scope.signUp = function() {
            $http.post('/views/register', {
                    'username': $scope.loginModel.username,
                    'password': $scope.loginModel.password,
                    'email': $scope.loginModel.email
                })
                .then(function(data, status, headers, config) {

                }), (function(data, status, headers, config) {
                    $scope.loader.loading = false;
                    $scope.modalstatustext = "Unable to Update data!";
                });
        };
    });
