var app = angular.module("myApp", ["ngRoute"]);

app.factory("myFactory", function ($http) {
  return {
    apiData: function () {
      let display = {};
      $http({
        method: "GET",
        url: "https://api.coindesk.com/v1/bpi/currentprice.json",
      }).then(
        function mySuccess(response) {
          angular.copy(response.data, display);
        },
        function myError(response) {
          display = response.statusText;
        }
      );
      return display;
    },
  };
});

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/USD", {
        templateUrl: "usd.html",
        controller: "myController",
      })

      .when("/EURO", {
        templateUrl: "euro.html",
        controller: "myController",
      })
      .when("/GBP", {
        templateUrl: "gbp.html",
        controller: "myController",
      })

      .otherwise({ redirectTo: "/USD" });
  },
]);

app.controller("myController", function ($scope, myFactory) {
  $scope.data = myFactory.apiData();
});
