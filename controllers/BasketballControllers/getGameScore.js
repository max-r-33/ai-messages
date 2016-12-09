var request = require('request');
var q = require('q');
var config = require('../../config');

var getDifferenceInDays = function(end, start) {
    var startDate = new Date(start),
        endDate = new Date(end),
        timeDiff = Math.abs(endDate.getTime() - startDate.getTime()),
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
};

var buildMessageObject = function(body, apiaiResponse, date) {
    var responseObj = {},
        event = JSON.parse(body)[0];

    responseObj.date = event.event_start_date_time;

    //gets todays date and the game date
    //from the provided date and figures out the difference
    //in number of days.
    var d = responseObj.date.split('T')[0].split('-'),
        gameDate = [d[1], d[2], d[0]].join('/'),
        dObj = new Date(),
        today = dObj.getMonth() + 1 + '/' + dObj.getDate() + '/' + dObj.getFullYear(),
        daysAgo = getDifferenceInDays(gameDate, today),
        casualDate = '';

    // finds casual date from number
    // provided by the days function
    if (daysAgo === 0) {
        casualDate = ' today';
    } else if (daysAgo === 1) {
        casualDate = ' yesterday';
    } else {
        casualDate = daysAgo + ' days ago ';
    }


    if (event.team_event_result === 'win') {
        responseObj.text = "The " + event.team.full_name + ' beat the ' + event.opponent.full_name +
            ' ' + casualDate + ' in ' + event.site.city + '.';
    } else {
        responseObj.text = "The " + event.team.full_name + ' lost to the ' + event.opponent.full_name +
            ' ' + casualDate + ' in ' + event.site.city + '.';
    }
    responseObj.type = 'sport';
    responseObj.gameType = event.team_event_location_type;
    responseObj.data = {
        pointsScored: event.team_points_scored,
        opponentPointsScored: event.opponent_points_scored
    };

    return responseObj;
};

module.exports = {
    getScore: function(apiaiResponse) {
        var defer = q.defer();

        //if apiai has a response, use that because it means some
        //required info wasn't provided
        if (apiaiResponse.result.fulfillment.speech) {
            defer.resolve({
                text: apiaiResponse.result.fulfillment.speech
            });
        } else {
            var team = apiaiResponse.result.parameters.teamName,
                date;
                options = {
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
                var event = JSON.parse(body)[0];
                if (!event || event.error) {
                    defer.resolve({
                        text: "You've made too many requests. Please wait a moment and try again!"
                    });
                } else {
                    defer.resolve(buildMessageObject(res.body, apiaiResponse));
                }
            });
        }
        return defer.promise;
    }
};
