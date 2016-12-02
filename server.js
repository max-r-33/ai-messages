var express = require('express');
var app = module.exports = express();
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');
var config = require('./config.js');

//controllers
var BasketballController = require('./controllers/BasketballController.js');
var MessagesController = require('./controllers/MessagesController.js');
var LoginController = require('./controllers/UserControllers/LoginController.js');
var SignupController = require('./controllers/UserControllers/SignupController.js');
var AccountController = require('./controllers/AccountController.js');

//db setup
var massiveInstance = massive.connectSync({
    connectionString: config.database
});

app.set('db', massiveInstance);
var db = app.get('db');

//express setup
app.use(cors());
app.use(bodyParser.json());

//ENDPOINTS

//messaging
    app.post('/api/handleRequest',BasketballController.handleRequest);
    app.post('/api/postMessage', MessagesController.postMessage);
    app.get('/api/getAllMessages/:id', MessagesController.getAllMessages);

//user controls
    app.post('/api/signup', SignupController.signup);
    app.post('/api/login', LoginController.login);
    app.put('/api/changeName', AccountController.changeName);
    app.delete('/api/deleteAccount', AccountController.deleteAccount);

app.listen(config.port, function() {
    console.log('listening on ' + config.port);
});
