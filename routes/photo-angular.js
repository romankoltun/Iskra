var app = angular.module('app', []);
app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);
app.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function(file, uploadUrl){
     var fd = new FormData();
     fd.append('file', file);
     $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
     })
     .success(function(){
     })
     .error(function(){
     });
  }
}]);
app.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
  $scope.uploadFile = function(){
     var file = $scope.myFile;
     var uploadUrl = "/savedata";
     fileUpload.uploadFileToUrl(file, uploadUrl);
  };
}]);
