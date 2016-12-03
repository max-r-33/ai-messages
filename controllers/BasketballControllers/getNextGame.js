var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(body, apiaiResponse) {
    //console.log(apiaiResponse);
    var responseObj = {};
    var event = JSON.parse(body);
    event = event[0];
    //console.log(event);

    if (apiaiResponse.result.fulfillment.speech) {
        responseObj = {
            text: apiaiResponse.result.fulfillment.speech
        };
    } else {
        //gets a casual date
        var d = event.event_start_date_time.split('T')[0].split('-');
        var gameDate = d.join('/');
        var game = new Date(gameDate);
        var today = new Date();
        var casualDate;

        if (today.getDay() === game.getDay()) {
            casualDate = ' today';
        } else if (today.getDay() === game.getDay() - 1) {
            casualDate = ' tomorrow';
        } else {
            casualDate = ' in ' + (game.getDay() - today.getDay()) + ' days';
        }

        //gets EST time
        var dateTime = event.event_start_date_time.split('T')[1].split('-')[0];
        var time = parseInt(dateTime.split(':')[0])-12 + ':' + dateTime.split(':')[1];
        responseObj = {
            text: 'The ' + event.team.last_name + ' play the ' + event.opponent.last_name + ' in ' + event.site.city +
                casualDate + ' at ' + time + ' EST.'
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
            var event = JSON.parse(body);
            event = event[0];
            if (event.error) {
                defer.resolve({
                    text: "You've made too many requests. Please wait a moment and try again!"
                });
            } else {
                defer.resolve(buildMessageObject(res.body, apiaiResponse));
            }
        });
        return defer.promise;
    }
};
