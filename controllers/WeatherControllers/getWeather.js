var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getWeather: function(apiaiResponse){
        var defer = q.defer();
        console.log(apiaiResponse);
        var city = apiaiResponse.result.parameters.geoCity;
        var conditions, temp, high, low, country;
        var responseObj = {};

        console.log('city name' + city);
        var options = {
            url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + config.weatherToken + '&units=imperial'
        };

        request(options, function(err, res, body){
            console.log(JSON.parse(res.body));
            var data = JSON.parse(res.body);

            console.log(data.weather[0].main);
            city = data.name;
            conditions = data.weather[0].main;
            temp = Math.round(data.main.temp);
            high = Math.round(data.main.temp_max);
            low = Math.round(data.main.temp_min);

            country = '';
            if(data.sys.country !== 'US'){
                country = ' ' + data.sys.country;
            }
            responseObj = {
                text : 'It is currently ' + temp + '° in ' + city + country + '. Conditions are ' + conditions + '.'
            };

            console.log(responseObj.text);
            defer.resolve(responseObj);
        });


        return defer.promise;
    }
};
