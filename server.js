var express = require('express');
var app = module.exports = express();
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');
var config = require('./config.js');

//db setup
var massiveInstance = massive.connectSync({
    connectionString: config.database
});

app.set('db', massiveInstance);
var db = app.get('db');

//express setup
app.use(cors());
app.use(bodyParser.json());

//controllers
var RequestController = require('./controllers/RequestController.js');
var MessagesController = require('./controllers/MessagesController.js');
var LoginController = require('./controllers/UserControllers/LoginController.js');
var SignupController = require('./controllers/UserControllers/SignupController.js');
var AccountController = require('./controllers/UserControllers/AccountController.js');


//ENDPOINTS

//messaging
app.post('/api/handleRequest',RequestController.handleRequest);
app.get('/api/getAllMessages/:id', MessagesController.getAllMessages);

//user controls
app.post('/api/signup', SignupController.signup);
app.get('/api/login', LoginController.login);
app.put('/api/changeName', AccountController.changeName);
app.delete('/api/deleteAccount', AccountController.deleteAccount);

app.listen(config.port, function() {
    console.log('listening on ' + config.port);
});
