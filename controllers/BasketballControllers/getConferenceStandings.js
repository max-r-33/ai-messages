var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getStandings: function(apiaiResponse) {
        console.log(apiaiResponse);
        var defer = q.defer();
        if (apiaiResponse.result.fulfillment.speech) {
            defer.resolve({
                text: apiaiResponse.result.fulfillment.speech
            });
        } else {
            var conference = apiaiResponse.result.parameters.conference;
            var responseObj = {};
            var options = {
                url: 'https://erikberg.com/nba/standings.json',
                headers: {
                    "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                    "Authorization": "Bearer " + config.basketballToken
                }
            };

            request(options, function(err, res, body) {
                var data = JSON.parse(res.body);
                if (data.length > 5) {
                    data = data.slice(0, 5);
                }
                responseObj.type = 'sportStandings';
                responseObj.data = [];
                var standings = data.standing.filter(function(team) {
                    return team.conference === conference;
                });
                standings.forEach(function(team) {
                    responseObj.data.push({
                        rank: team.rank,
                        streak: team.streak,
                        games_back: team.games_back,
                        name: team.first_name + ' ' + team.last_name,
                        record: team.won + '-' + team.lost,
                        conferenceRecord: team.conference_won + '-' + team.conference_lost,
                        conference: conference.toLowerCase()
                    });
                });
                defer.resolve(responseObj);
            });
        }
        return defer.promise;
    }
};
