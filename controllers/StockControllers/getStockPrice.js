var request = require('request');
var q = require('q');
var config = require('../../config');

module.exports = {
    getPrice: function(apiaiResponse) {
        var defer = q.defer();
        var responseObj, stockInfo = {};
        console.log(apiaiResponse);
        if(apiaiResponse.result.fulfillment.speech){
            defer.resolve({text: apiaiResponse.result.fulfillment.speech});
            return defer.promise;
        }
        
        var options = {
            url: 'http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + encodeURIComponent(apiaiResponse.result.parameters.companyName)
        };

        request(options, function(err, res, body) {
            var data = JSON.parse(res.body);

            //checks to see if any data was returned.
            //if a valid stock symbol was found, make another request
            // to get its price
            if (data[0]) {
                stockInfo.symbol = data[0].Symbol;
                stockInfo.companyName = data[0].Name;

                //sets exchange dynamically as long as its NASDAQ or NYSE
                if (stockInfo.exchange === 'NASDAQ' || stockInfo.exchange === 'NYSE') {
                    stockInfo.exchange = data[0].Exchange;
                } else {
                    stockInfo.exchange = 'NASDAQ';
                }

                //redefining options url
                options.url = 'http://finance.google.com/finance/info?client=ig&q=' + encodeURIComponent(stockInfo.exchange) + ':' + stockInfo.symbol;

                request(options, function(err, res, body) {
                    //making valid json from the response
                    var result = res.body.split("//");
                    var valid = JSON.parse(result[1]);

                    stockInfo.price = valid[0].l;
                    stockInfo.lastUpdated = valid[0].ltt;
                    stockInfo.percentChange = valid[0].cp;
                    stockInfo.change = valid[0].c;
                    stockInfo.afterHoursLastPrice = valid[0].el;

                    if (parseFloat(stockInfo.change) > 0) {
                        responseObj = {
                            text: 'The price of ' + stockInfo.companyName + ' stock is $' + stockInfo.price + ". Today, it's up " + stockInfo.percentChange +
                                '% (' + stockInfo.change + ').'
                        };
                    } else {
                        responseObj = {
                            text: 'The price of ' + stockInfo.companyName + ' stock is $' + stockInfo.price + ". Today, it's down " + stockInfo.percentChange +
                                '% (' + stockInfo.change + ').'
                        };
                    }
                    defer.resolve(responseObj);
                });

            } else {
                //handles case where a nonvalid company was requested
                responseObj = {
                    text: 'The price for ' + apiaiResponse.result.parameters.companyName + ' stock could not be found.'
                };
                defer.resolve(responseObj);
            }
        });
        return defer.promise;
    }
};
