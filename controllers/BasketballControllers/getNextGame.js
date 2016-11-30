var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(body, apiaiResponse) {
    console.log(apiaiResponse);
    var responseObj = {};
    var event = JSON.parse(body);
    event = event[0];
    console.log(event);


    if (apiaiResponse.result.fulfillment.speech) {
        responseObj = {
            text: apiaiResponse.result.fulfillment.speech
        };
    } else {
        //gets a casual date
        var d = event.event_start_date_time.split('T')[0].split('-');
        var gameDate = d.join('/');
        var game = new Date(gameDate);
        console.log(game.getDay());

        var today = new Date();
        console.log(today.getDay());
        var casualDate;

        if (today.getDay() === game.getDay()) {
            casualDate = ' today';
        } else if (today.getDay() === game.getDay() - 1) {
            casualDate = ' tomorrow';
        } else {
            casualDate = ' in ' + (game.getDay() - today.getDay()) + ' days';
        }
        responseObj = {
            text: 'The ' + event.team.last_name + ' play the ' + event.opponent.last_name + ' in ' + event.site.city +
                casualDate + '.'
        };
    }

    return responseObj;
};

module.exports = {
    getGame: function(apiaiResponse) {
        var team = apiaiResponse.result.parameters.teamName;
        var defer = q.defer();

        var options = {
            url: 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?next=1',
            headers: {
                "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                "Authorization": "Bearer " + config.basketballToken
            }
        };
        request(options, function(err, res, body) {
            defer.resolve(buildMessageObject(res.body, apiaiResponse));
        });
        return defer.promise;
    }
};
