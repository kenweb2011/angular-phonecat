(function() {

    var person = {
        firstName: "scott",
        lastName: "Allen",
        imageSrc: "http://odetocode.com/Images/scott_allen_2.jpg"
    }

    var myController = function($scope, $http, $interval) {

        var onRepos = function(response) {
            $scope.repos = response.data;
        };
        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };
        var onError = function(reason) {
            $scope.error = "Could not fetch data"
        };    
        //$http.get("https://api.github.com/users/robconery")
        //    .then(onUserComplete, onUserError);

        var decrementCountdown = function() {
            $scope.countDown -= 1;
            if ($scope.countDown <= 0) {
                $scope.search($scope.username);
            }
        };

        var startCountdown = function() {
            $interval(decrementCountdown, 1000, $scope.countDown);
        };

        var search = function(username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        }
        $scope.search = search;
        $scope.message = "GitHub Viewer";
        $scope.username = "angular";
        $scope.repoSortOrder = "-stargazers_count";
        //$scope.person = person;
        $scope.countDown = 5;

        startCountdown();
    };

    var myApp = angular.module("myApp", []);
    myApp.controller("myController", ["$scope", "$http", "$interval", myController]);

})();

var work = function() {
    console.log("working...");
};
work();

var doWork = function(f) {
    f();
}
doWork(work);

var createWorker = function() {
    var task2 = function() { console.log("in task2"); };
    return {
        job1: function() { console.log("in task1"); },
        job2: task2
    };
}
var worker = createWorker();
worker.job1();
worker.job2();
