var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getFutureWeather: function(apiaiResponse) {
        var defer = q.defer(),
            data, conditions, temp, high, low, city, country,
            responseObj = {};

        //checks if city name was found
        if (apiaiResponse.result.parameters.geoCity) {
            city = apiaiResponse.result.parameters.geoCity;
        } else if (apiaiResponse.result.parameters.teamName) {
            city = apiaiResponse.result.parameters.teamName;
        } else {
            defer.resolve({
                text: 'City name not found. Try a different city.'
            });
            return defer.promise;
        }

        var options = {
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&APPID=' + config.weatherToken + '&units=imperial'
        };

        request(options, function(err, res, body) {
            data = JSON.parse(res.body);
            country = '';
            city = data.city.name;
            high = Math.ceil(data.list[0].temp.max);
            low = Math.ceil(data.list[0].temp.min);
            conditions = data.list[0].weather[0].main;

            //shows country on response card if it isn't in the us
            if (data.city.country !== 'US') {
                country = data.city.country;
            }

            responseObj = {
                text: 'The high for tomorrow in ' + city + ' ' + country + ' is ' + high + '° and the low is ' + low +
                    '°. Conditions are supposed to be ' + conditions + '.'
            };
            responseObj.type = 'weatherForecast';
            responseObj.data = {
                description: 'Tomorrow',
                temperature: high + ':' + low,
                conditions: conditions,
                city: city,
                country: country
            };
            defer.resolve(responseObj);
        });

        return defer.promise;
    }
};
