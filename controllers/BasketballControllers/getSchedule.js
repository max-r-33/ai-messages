var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getSchedule: function(apiaiResponse) {
        var date = apiaiResponse.result.parameters.date.split('-').join('');
        console.log(date);
        var defer = q.defer();
        var responseObj = {};
        var options = {
            url: 'https://erikberg.com/events.json?date=' + date + '&sport=nba',
            headers: {
                "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                "Authorization": "Bearer " + config.basketballToken
            }
        };

        request(options, function(err, res, body) {
            var event = JSON.parse(res.body);
            if (event.error) {
                defer.resolve({
                    text: "You've made too many requests. Please wait a moment and try again!"
                });
            } else {

                var d = event.event[0].start_date_time.split('T')[0].split('-');
                var gameDate = [d[1], d[2], d[0]].join('/');

                responseObj = {
                    text: 'NBA Games on ' + gameDate,
                    type: 'daySchedule',
                    data: []
                };
                event.event.forEach(function(game) {
                    var dateTime = game.start_date_time.split('T')[1].split('-')[0];
                    var time = parseInt(dateTime.split(':')[0]) - 12 + ':' + dateTime.split(':')[1];
                    responseObj.data.push({
                        time: time,
                        event_status: game.event_status,
                        homeTeam: game.home_team.last_name,
                        homeTeamAbbr: game.home_team.abbreviation,
                        homeTeamPts: game.home_points_scored,
                        awayTeam: game.away_team.last_name,
                        awayTeamAbbr: game.away_team.abbreviation,
                        awayTeamPts: game.away_points_scored,
                        date: date
                    });
                });
                if (responseObj.data.length > 4) {
                    responseObj.data = responseObj.data.slice(0, 4);
                }
                defer.resolve(responseObj);
            }
        });
        return defer.promise;
    }
};
