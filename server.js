var express = require('express');
var app = module.exports = express();
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');
var BasketballController = require('./controllers/BasketballController.js');
var MessagesController = require('./controllers/MessagesController.js');
var config = require('./config.js');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var massiveInstance = massive.connectSync({
    connectionString: config.database
});

app.set('db', massiveInstance);
var db = app.get('db');

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'sdfsdgadgsassrg',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/handleRequest', BasketballController.handleRequest);
app.get('/api/getAllMessages/:id', MessagesController.getAllMessages);

//preps data to put on session
passport.serializeUser(function(user, done) {
    done(null, user);
});

//gets data from session, preps for req.user
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookID,
    clientSecret: config.facebookSecret,
    callbackURL: config.baseDomain + '/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    //go to db and look for profile.id, create a user
    db.create_user([profile.id, profile.displayName.split(' ')[0], profile.displayName.split(' ')[1]], function(err, user) {

    });
    return done(null /* error */ , profile /* info that goes on session now */ );
}));


//auth endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/me',
    failureRedirect: '/login'
}), function(req, res) {
    console.log(req.session);
});

app.get('/me', function(req, res, next) {
    res.send(req.user);
});

app.listen(config.port, function() {
    console.log('listening on ' + config.port);
});
