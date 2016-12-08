var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getSchedule: function(apiaiResponse) {
        var date = apiaiResponse.result.parameters.date.split('-').join(''),
            defer = q.defer(),
            responseObj = {},
            options = {
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
                var d = event.event[0].start_date_time.split('T')[0].split('-'),
                    gameDate = [d[1], d[2]].join('/'),
                    responseObj = {
                        text: 'Games on ' + gameDate,
                        type: 'daySchedule',
                        data: []
                    };

                event.event.forEach(function(game) {
                    var dateTime = game.start_date_time.split('T')[1].split('-')[0],
                        time = parseInt(dateTime.split(':')[0]) - 12 + ':' + dateTime.split(':')[1],
                        homeClass = 'loser',
                        awayClass = 'winner';

                    if (game.home_points_scored > game.away_points_scored) {
                        homeClass = 'winner';
                        awayClass = 'loser';
                    }
                    responseObj.data.push({
                        time: time,
                        event_status: game.event_status,
                        homeTeam: game.home_team.last_name,
                        homeTeamAbbr: game.home_team.abbreviation,
                        homeTeamPts: game.home_points_scored,
                        homeClass: homeClass,
                        awayTeam: game.away_team.last_name,
                        awayTeamAbbr: game.away_team.abbreviation,
                        awayTeamPts: game.away_points_scored,
                        awayClass: awayClass,
                        date: date
                    });
                });
                defer.resolve(responseObj);
            }
        });
        return defer.promise;
    }
};
