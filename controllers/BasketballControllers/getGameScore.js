var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(body, apiaiResponse) {
    var teamToSearch = apiaiResponse.result.parameters.teamName;
    var events = JSON.parse(body).event;
    var matchingEvent, homeOrAway, otherTeam;
    var responseObj = {};

    //loops through all events and checks if any of them
    //involve the team the user asked about
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

    //if an event was found build a response object
    if (matchingEvent) {
        //checks if the team being searched for is the home team or away team and if they won and constructs appropriate message
        if (parseInt(matchingEvent[homeOrAway + '_points_scored']) > parseInt(matchingEvent[otherTeam + '_points_scored'])) {
            responseObj.text = "The " + matchingEvent[homeOrAway + '_team'].full_name + ' beat the ' + matchingEvent[otherTeam + '_team'].full_name +
                ' ' + matchingEvent[homeOrAway + '_points_scored'] + ' to ' + matchingEvent[otherTeam + '_points_scored'];
        } else {
            responseObj.text = "The " + matchingEvent[homeOrAway + '_team'].full_name + ' lost to the ' + matchingEvent[otherTeam + '_team'].full_name +
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

        return responseObj;
    } else {
        responseObj.error = 'no event found';
        return responseObj;
    }
};

module.exports = {

    getScore: function(apiaiResponse) {
        var date;
        var d = new Date();
        var defer = q.defer();

        //gets and reformats date from api.ai,
        // or builds today's date if there is not one provided by the user.
        if (apiaiResponse.result.parameters.date !== '') {
            date = apiaiResponse.result.parameters.date.split('-').join('');
        } else {
            date = d.getFullYear() + '' + (d.getMonth() + 1) + '' + (d.getDate() - 1);
            console.log("DATE: " + date);
        }

        //options for the http request
        var options = {
            url: 'https://erikberg.com/events.json?date=' + date + '&sport=nba',
            headers: {
                "User-Agent": "SportsAI/1.0 (max.rodewald@gmail.com)",
                "Authorization": "Bearer " + config.basketballToken
            }
        };

        //request to events endpoint
        request(options, function(error, res, body) {
            var responseObj = buildMessageObject(body, apiaiResponse);
            if (responseObj.error !== 'no event found') {
                responseObj.text += ' yesterday.';
                defer.resolve(responseObj);
            } else {

                //if the correct game is not found, then send another request with the next
                //earliest date
                date = d.getFullYear() + '' + (d.getMonth() + 1) + '' + (d.getDate() - 2);
                options.url = 'https://erikberg.com/events.json?date=' + date + '&sport=nba';

                request(options, function(error, res, body) {
                    var responseObj = buildMessageObject(body, apiaiResponse);
                    console.log(responseObj);
                    if (responseObj.error !== 'no event found') {
                        defer.resolve(responseObj);
                        responseObj.text += ' two days ago.';
                    } else {
                        responseObj.text ="The " + apiaiResponse.result.parameters.teamName + " haven't played for the past few days.";
                        defer.resolve(responseObj);
                    }
                });
            }
        });
        return defer.promise;
    }
};
