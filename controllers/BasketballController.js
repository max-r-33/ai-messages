var request = require('request');
var q = require('q');
var apiai = require('apiai');
var config = require('../config.js');
var app = apiai(config.apiaiToken);

var getGameScore = require('./BasketballControllers/getGameScore.js');
var getTeamRecord = require('./BasketballControllers/getTeamRecord.js');

module.exports = {
    handleRequest: function(req, res, next) {

        var request = app.textRequest(req.body.textRequest, {
            sessionId: 'abbcccdddd'
        });

        request.on('response', function(response) {

            if (response.result.action === 'get.game.score') {
                getGameScore.getScore(response).then(function(result) {
                    res.send(result);
                });
            } else if (apiaiResponse.result.action === 'get.team.record') {
                getTeamRecord.getRecord(response).then(function(result) {
                    res.send(result);
                });
            }

        });

        request.on('error', function(err) {
            console.log(err);
            res.send(err);
        });

        request.end();
    }
};
