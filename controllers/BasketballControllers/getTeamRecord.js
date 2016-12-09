var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(body, apiaiResponse) {
    console.log(apiaiResponse);
    var event = JSON.parse(body)[0],
        responseObj = {
            text: 'The ' + apiaiResponse.result.parameters.teamName + ' are ' + event.team_events_won + '-' + event.team_events_lost + '.'
        };

    return responseObj;
};

module.exports = {
    getRecord: function(apiaiResponse) {
        var defer = q.defer();
        if (apiaiResponse.result.fulfillment.speech) {
            responseObj = {
                text: apiaiResponse.result.fulfillment.speech
            };
        } else {
            var team = apiaiResponse.result.parameters.teamName,
                options = {
                    url: 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?last=1',
                    headers: {
                        "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                        "Authorization": "Bearer " + config.basketballToken
                    }
                };

            request(options, function(err, res, body) {
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
