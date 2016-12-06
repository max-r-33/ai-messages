var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getWeather: function(apiaiResponse) {
        console.log(apiaiResponse);
        var defer = q.defer();
        var city = apiaiResponse.result.parameters.geoCity;
        var cond, temp, high, low, country;
        var responseObj = {};
        var options = {
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) + '&APPID=' + config.weatherToken + '&units=imperial'
        };

        request(options, function(err, res, body) {
            var data = JSON.parse(res.body);
            if(data.weather){
                city = data.name;
                cond = data.weather[0].main;
                temp = Math.round(data.main.temp);
                high = Math.round(data.main.temp_max);
                low = Math.round(data.main.temp_min);
                country = '';

                //shows country on response card if it isn't in the us
                if (data.sys.country !== 'US') {
                    country = ' ' + data.sys.country;
                }

                responseObj = {
                    text: 'It is currently ' + temp + '° in ' + city + country + '. Conditions are ' + cond + '.'
                };

                responseObj.type = 'weather';
                responseObj.data = {
                    description: 'Current',
                    temperature: temp,
                    conditions: cond,
                    city: city,
                    country: country
                };
                defer.resolve(responseObj);
            }else{
                defer.resolve({text: 'That city could not be found. Try being more specific or searching a nearby city.'});
            }
        });


        return defer.promise;
    }
};
