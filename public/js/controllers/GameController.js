angular.module("p4")
.controller("GameController",
    function ($q, $timeout, GamesService, $routeParams) {
    "use strict";

    var game = this;
    var ready = false;

    GamesService.get($routeParams.id)
    .then(function (g) {
        var promises = g.plays.map(function(col, i) {
            return $timeout(function() {
                game.board = GamesService.nextPlay(game.board, col);
                game.nextPlayer = GamesService.nextPlayer(game.board);
            }, 100 * i);
        });
        return $q.all(promises);
    })
    .then(function () {
        ready = true;
    });

    game.play = function(col) {
        if (!ready) return;
        game.board = GamesService.nextPlay(game.board, col);
        game.nextPlayer = GamesService.nextPlayer(game.board);
        var winner = GamesService.check(game.board, col);
        if (winner) {
            alert("Winner " + winner);
        };
    };

});
