angular.module("p4")
.controller("LoginController", function (UsersService, GamesService) {
    "use strict";
    var login = this;
    var promiseOfGames = GamesService.getAll();

    UsersService.getAll().then(function (users) {
        login.users = users;
    });

    login.accounts = [
        {
            form: null, // formulaire de saisie du user 1
            user: { name: "Bruno", email: "" } // données du user 1
        },
        {
            form: null, // formulaire de saisie du user 2
            user: { name: "Nicolas", email: "" } // données du user 2
        }
    ];

    login.setUser = function (account) {
        if (account.form.$invalid) return;
        UsersService.addOrRetrieve(account.user)
            .then(function (user) {
                account.user = user;
                getGames();
            });
    };

    function getGames() {
        var u1 = login.accounts[0].user.id;
        var u2 = login.accounts[1].user.id;
        if (!u1 || !u2) return;
        promiseOfGames.then(function(games) {
            login.games = games.filter(function(game) {
                return ( game.user1 === u1 && game.user2 === u2 )
                    || ( game.user2 === u1 && game.user1 === u2 );
            });
        });
    }


})