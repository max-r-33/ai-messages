var request = require('request');
var q = require('q');
var config = require('../../config');

var buildMessageObject = function(boxscore, team, opponent, fName, lName, statType, homeOrAway) {
    var event = JSON.parse(boxscore);
    var responseObj = {};
    var teamData;
    var player;
    var statCount;
    var playerFName, playerLName;

    console.log('getting ' + statType + ' for ' + fName + ' ' + lName + ' on the ' + team + ' at ' + homeOrAway);
    //console.log(event);

    //handles error of too many requests
    if (event.error) {
        responseObj = {
            text: "You've made too many requests. Please wait a moment and try again!"
        };
    } else {
        //gets data based on whether
        // team was home or away
        if (homeOrAway === 'a') {
            teamData = event.away_stats;
        } else {
            teamData = event.home_stats;
        }

        teamData.forEach(function(p) {
            if (p.last_name.toLowerCase() === lName.toLowerCase()) {
                player = p;
                playerFName = p.first_name;
                playerLName = p.last_name;
            }
        });

        for (var key in player) {
            if (key.toLowerCase() === statType) {
                statCount = player[key];
            }
        }

        //if player was found on roster, but didn't have
        //any stats in the given catgory
        if (player && !statCount || statCount === 0) {
            responseObj = {
                text: playerFName + ' ' + playerLName + " didn't have any " + statType + ' against the ' + opponent + '.'
            };
            //if stat was minutes, phrase the message differently
        } else if (statCount && statType === 'minutes') {
            responseObj = {
                text: playerFName + ' ' + playerLName + ' played ' + statCount + ' ' + statType + ' against the ' + opponent + '.'
            };
            //output when statcount was found and player was found
        } else if (statCount) {
            responseObj = {
                text: playerFName + ' ' + playerLName + ' had ' + statCount + ' ' + statType + ' against the ' + opponent + '.'
            };
            //response when the specified player wasn't found
        } else {
            responseObj = {
                text: "He isn't on the " + team + '.'
            };
        }
    }

    return responseObj;
};

module.exports = {
    getStat: function(apiaiResponse) {
        console.log('--------');
        console.log(apiaiResponse.result.contexts[0].parameters);
        console.log('--------');

        var defer = q.defer();
        var statistic = apiaiResponse.result.action.split('.')[2];
        var fName = apiaiResponse.result.parameters.givenName;
        var lName = apiaiResponse.result.parameters.lastName;
        var team;

        if (apiaiResponse.result.contexts[0].parameters.teamName) {
            team = apiaiResponse.result.contexts[0].parameters.teamName;
        } else if (apiaiResponse.result.contexts[0].parameters.name) {
            team = apiaiResponse.result.contexts[0].parameters.name;
        }

        var eventID;
        var locationType; //home or away

        var options = {
            url: 'https://erikberg.com/nba/results/' + team.toLowerCase().split(' ').join('-') + '.json?last=1',
            headers: {
                "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                "Authorization": "Bearer " + config.basketballToken
            }
        };

        //gets event id based on team name
        request(options, function(err, res, body) {
            console.log(body);
            var event = JSON.parse(body);
            event = event[0];
            console.log('---');
            console.log(event);
            console.log('---');

            //error handling
            if (event.error) {
                defer.resolve({
                    text: "You've made too many requests. Please wait a moment and try again!"
                });
            } else {
                //if there was no error, get the event id
                eventID = event.event_id;
                locationType = event.team_event_location_type;
                opponent = event.opponent.last_name;

                //makes request to box score endpoint that has stats
                options.url = 'https://erikberg.com/nba/boxscore/' + eventID + '.json';
                request(options, function(err, res, body) {
                    //error handling
                    if (event.error) {
                        defer.resolve({
                            text: "You've made too many requests. Please wait a moment and try again!"
                        });
                        return;
                    }
                    //resolve promies with new message object
                    defer.resolve(buildMessageObject(res.body, team, opponent, fName, lName, statistic, locationType));
                });
            }
        });

        return defer.promise;
    }
};
