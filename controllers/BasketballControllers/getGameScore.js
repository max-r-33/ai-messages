var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getScore: function(apiaiResponse) {
        var date, result;
        var d = new Date();
        var found = false;
        var defer = q.defer();

        //gets date from api.ai, or builds today's date if there is not one given.
        if (apiaiResponse.result.parameters.date !== '') {
            date = apiaiResponse.result.parameters.date.split('-').join('');
        } else {
            date = d.getFullYear() + '' + (d.getMonth() + 1) + '' + (d.getDate() - 1);
            console.log("DATE: " + date);
        }

        var options = {
            url: 'https://erikberg.com/events.json?date=' + date + '&sport=nba',
            headers: {
                "User-Agent": "SportsAI/1.0 (max.rodewald@gmail.com)",
                "Authorization": "Bearer " + config.basketballToken
            }
        };

        //request to events endpoint
        request(options, function(error, res, body) {
            var teamToSearch = apiaiResponse.result.parameters.teamName;
            var events = JSON.parse(body).event;
            var matchingEvent, homeOrAway, otherTeam;
            var responseObj = {};

            events.forEach(function(event) {
                if (event.away_team.full_name === teamToSearch) {
                    matchingEvent = event;
                    homeOrAway = 'away';
                    otherTeam = 'home';
                } else if (event.home_team.full_name === teamToSearch) {
                    matchingEvent = event;
                    homeOrAway = 'home';
                    otherTeam = 'away';
                }
            });
            if (matchingEvent) {
                //checks if the team being searched for is the home team or away team and if they won
                if (parseInt(matchingEvent[homeOrAway + '_points_scored']) > parseInt(matchingEvent[otherTeam + '_points_scored'])) {
                    responseObj.message = "The " + matchingEvent[homeOrAway + '_team'].full_name + ' beat the ' + matchingEvent[otherTeam + '_team'].full_name +
                        ' ' + matchingEvent[homeOrAway + '_points_scored'] + ' to ' + matchingEvent[otherTeam + '_points_scored'];
                } else {
                    responseObj.message = "The " + matchingEvent[homeOrAway + '_team'].full_name + ' lost to the ' + matchingEvent[otherTeam + '_team'].full_name +
                        ' ' + matchingEvent.away_points_scored + ' to ' + matchingEvent.home_points_scored;
                }

                //builds object to return
                responseObj.teamSearchedFor = {
                    homeOrAway: homeOrAway,
                    periodScore: matchingEvent[homeOrAway + '_period_scores']
                };

                responseObj.opposingTeam = {
                    homeOrAway: otherTeam,
                    periodScore: matchingEvent[otherTeam + '_period_scores']
                };

                defer.resolve(responseObj);
            } else {
                defer.resolve({
                    message: 'The ' + teamToSearch + ' did not play yesterday'
                });
            }
        });
        return defer.promise;
    }
};
