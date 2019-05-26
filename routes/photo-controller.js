$scope.uploadFile = function(){

        var file = $scope.myFile;
        var uploadUrl = "/multer";
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl,fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          console.log("success!!");
        })
        .error(function(){
          console.log("error!!");
        });
    };
