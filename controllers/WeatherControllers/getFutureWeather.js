var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getFutureWeather: function(apiaiResponse) {
        var defer = q.defer();
        console.log(apiaiResponse);
        var conditions, temp, high, low, city, country;
        var responseObj = {};

        if(apiaiResponse.result.parameters.geoCity){
            city =  apiaiResponse.result.parameters.geoCity;
        }else if( apiaiResponse.result.parameters.teamName){
            city =  apiaiResponse.result.parameters.teamName;
        }else{
            responseObj.text = "City name not found. Try a different city.";
            defer.resolve(responseObj);
            return defer.promise;
        }

        var options = {
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&APPID=' + config.weatherToken + '&units=imperial'
        };

        request(options, function(err, res, body) {
            console.log(JSON.parse(res.body));

            var data = JSON.parse(res.body);
            country = '';
            city = data.city.name;
            high = Math.ceil(data.list[0].temp.max);
            low  = Math.ceil(data.list[0].temp.min);
            conditions = data.list[0].weather[0].main;
            if(data.city.country !== 'US'){
                country = data.city.country;
            }

            console.log('city name' + city);

            responseObj = {
                text: 'The high for tomorrow in ' + city + ' ' + country + ' is ' + high + '° and the low is ' + low +
                    '°. Conditions are supposed to be ' + conditions + '.'
            };

            console.log(responseObj.text);
            defer.resolve(responseObj);
        });


        return defer.promise;
    }
};
