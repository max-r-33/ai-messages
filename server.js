var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var BasketballController = require('./controllers/BasketballController.js');
var config = require('./config.js');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/handleRequest', BasketballController.handleRequest);

app.listen(config.port, function(){
    console.log('listening on ' + config.port);
});
