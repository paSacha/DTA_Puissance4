angular.module("p4")
.factory("UsersService", function ($http) {

    var service = {};

    service.getAll = function () {
        return $http.get("/users")
        .then(function (response) {
            return response.data;
        });
    };

    service.add = function (user) {
        return $http.post("/users", user)
        .then(function (response) {
            return response.data;
        });
    };

    service.addOrRetrieve = function (user) {
        return service.getAll()
        .then(function (users) {
            return users.find(function (u) {
                return u.name === user.name;
            });
        })
        .then(function (found) {
            if (found) return found;
            return service.add(user);
        });
    };

    return service;
});
