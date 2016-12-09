var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getLeader: function(apiaiResponse) {
        var defer = q.defer();
        if (apiaiResponse.result.fulfillment.speech) {
            defer.resolve({
                text: apiaiResponse.result.fulfillment.speech
            });
        } else {
            var stat = apiaiResponse.result.parameters.statistic,
                responseObj = {};
                options = {
                    url: 'https://erikberg.com/nba/leaders/' + stat + '.json',
                    headers: {
                        "User-Agent": "SportsAI/1.0 (" + config.email + ")",
                        "Authorization": "Bearer " + config.basketballToken
                    }
                };

            request(options, function(err, res, body) {
                var data = JSON.parse(res.body);
                if(!data || data.error){
                    defer.resolve({
                        text: "You've made too many requests. Please wait a moment and try again!"
                    });
                }else{
                    if (data.length > 5) {
                        data = data.slice(0, 5);
                    }
                    responseObj.type = 'sportStatistic';
                    responseObj.text = data[0].display_name + ' leads the league in ' + stat.split('_').join(' ') + ' with ' + data[0].value;
                    responseObj.data = [];
                    data.forEach(function(player) {
                        responseObj.data.push({
                            name: player.display_name,
                            rank: player.rank,
                            value: player.value,
                            team: player.team.full_name,
                            stat: stat.split('_').join(' ')
                        });
                    });
                    defer.resolve(responseObj);
                }

            });
        }
        return defer.promise;
    }
};
