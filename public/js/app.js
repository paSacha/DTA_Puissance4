angular.module("p4", [
  "ngRoute"
])

.config(function ($routeProvider) {

  $routeProvider

  .when("/", {
    templateUrl: "views/login.html",
    controller: "LoginController",
    controllerAs: "login"
  })

  .when("/game/:id", {
    templateUrl: "views/game.html",
    controller: "GameController",
    controllerAs: "game"
  })

  .when("/about/:id?", {
    templateUrl: "views/about.html",
    controller: function ($routeParams) {
      console.log("params", $routeParams.id);
    }
  })

  .otherwise({
    redirectTo: "/"
    //templateUrl: "views/notfound.html"
  })
  ;

});

// Polyfills
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find a été appelé sur null ou undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate doit être une fonction');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}