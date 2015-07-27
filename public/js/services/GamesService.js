angular.module("p4")
.factory("GamesService", function($http){
    "use strict";
    var service = {};

    service.getAll = function(){
        return $http.get("/games")
        .then(function (response) {
            return response.data;
        });
    };

    service.get = function(idGame){
        return $http.get("/games/" + idGame)
        .then(function (response) {
            return response.data;
        });
    };

    service.nextPlayer = function (board) {
        return board.reduce(function (s, b) {
            return s + b.length;
        }, 0) % 2 + 1;
    };

    service.nextPlay = function (board, col) {
        if (!board) board = [[], [], [], [], [], [], []];
        if (board[col].length === 6) return board;
        board[col].push(service.nextPlayer(board));
        return board;
    };

    // returns true if there is 4 or more consecutive tokens owned by 'playerId'
    function checkLine(playerId, line) {
        var win = String(playerId).repeat(4);
        return line.join("").indexOf(win) !== -1;

        // var counter = 0;
        // var length = line.reduce(function(maxLength, value) {
        //     counter = (value === playerId) ? counter + 1 : 0;
        //     return Math.max(maxLength, counter);
        // }, 0);

        // return (length >= 4);
    };

    service.check = function (board, col) {
        var row = board[col].length - 1;
        var playerId = board[col][row];
        var array;

        if (!playerId) { return 0; }

        // col
        if (checkLine(playerId, board[col])) {
            return playerId;
        }

        //row
        array = board.reduce(function(accu, value) {
            accu.push(value[row] || 0);
            return accu;
        }, []);
        if(checkLine(playerId, array)) { return playerId; }

        //uprising diagonal
        array = board.reduce(function(accu, value, idx) {
            accu.push(value[idx + row - col] || 0);
            return accu;
        }, []);
        if(checkLine(playerId, array)) {return playerId;}

        //downrising diagonal
        array = board.reduce(function(accu, value, idx) {
            accu.push(value[-idx + row + col] || 0);
            return accu;
        }, []);
        if(checkLine(playerId, array)) { return playerId;}

        return 0;
    };

    return service;
});