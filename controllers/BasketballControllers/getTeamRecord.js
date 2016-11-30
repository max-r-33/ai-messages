var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(body, apiaiResponse) {
    var responseObj = {};
    var event = JSON.parse(body);
    event = event[0];

    responseObj = {
        text: 'The ' + apiaiResponse.result.parameters.teamName + ' are ' + event.team_events_won + '-' + event.team_events_lost + '.'
    };

    return responseObj;
};

module.exports = {
    getRecord: function(apiaiResponse) {
        var team = apiaiResponse.result.parameters.teamName;
        var defer = q.defer();

        var options = {
            url: 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?last=1',
            headers: {
                "User-Agent": "SportsAI/1.0 (max.rodewald@gmail.com)",
                "Authorization": "Bearer " + config.basketballToken
            }
        };
        request(options, function(err, res, body) {
            defer.resolve(buildMessageObject(res.body, apiaiResponse));
        });
        return defer.promise;
    }
};
