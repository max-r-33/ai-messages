var request = require('request');
var q = require('q');
var config = require('../../config');

var getDifferenceInDays = function(end, start) {
    var date1 = new Date(start);
    var date2 = new Date(end);

    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
};

var buildMessageObject = function(body, apiaiResponse, date) {
    var responseObj = {};
    var event = JSON.parse(body);
    event = event[0];

    if (apiaiResponse.result.fulfillment.speech) {
        responseObj = {
            text: apiaiResponse.result.fulfillment.speech
        };
    } else {
        responseObj.date = event.event_start_date_time;

        //gets todays date and the game date and figures out the difference
        //in number of days.
        var d = responseObj.date.split('T')[0].split('-');
        var gameDate = [d[1], d[2], d[0]].join('/');
        var dObj = new Date();
        var today = dObj.getMonth() + 1 + '/' + dObj.getDate() + '/' + dObj.getFullYear();

        var daysAgo = getDifferenceInDays(gameDate, today);
        var casualDate = '';
        if (daysAgo === 0) {
            casualDate = ' today';
        } else if (daysAgo === 1) {
            casualDate = ' yesterday';
        } else {
            casualDate = daysAgo + ' days ago ';
        }

        if (!date) {
            if (event.team_event_result === 'win') {
                responseObj.text = "The " + event.team.full_name + ' beat the ' + event.opponent.full_name +
                    ' ' + casualDate + ' in ' + event.site.city + ', ' + event.team_points_scored + ' to ' + event.opponent_points_scored;
            } else {
                responseObj.text = "The " + event.team.full_name + ' lost to the ' + event.opponent.full_name +
                    ' ' + casualDate + ' in ' + event.site.city + ', ' + event.opponent_points_scored + ' to ' + event.team_points_scored;
            }
        }
        responseObj.gameType = event.team_event_location_type;

    }
    return responseObj;
};

module.exports = {
    getScore: function(apiaiResponse) {
        var team = apiaiResponse.result.parameters.teamName;
        var defer = q.defer();
        var date;

        var options = {
            url: 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?last=1',
            headers: {
                "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                "Authorization": "Bearer " + config.basketballToken
            }
        };

        if (apiaiResponse.result.parameters.date) {
            date = apiaiResponse.result.parameters.date.split('-').join('');
            options.url = 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?last=5';
        }

        request(options, function(error, res, body) {
            var event = JSON.parse(body);
            event = event[0];
            if (event.error) {
                defer.resolve({
                    text: "You've made too many requests. Please wait a moment and try again!"
                });
            }else{
                defer.resolve(buildMessageObject(res.body, apiaiResponse));
            }
        });

        return defer.promise;
    }
};
