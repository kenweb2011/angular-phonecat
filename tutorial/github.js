(function() {

    var github = function($http) {            
        var onUserComplete = function(response) {
            return response.data;
        };

        var getUser = function(username) {
            return
                $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete);            
        };

        var getRepos = function(user) {
            return
                $http.get(user.repos_url)
                    .then(function(response) {
                        return response;
                    });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    var module = angular.module("myApp");
    module.factory("github", github);

}());