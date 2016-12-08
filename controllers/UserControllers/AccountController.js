var app = require('../../server.js');
var db = app.get('db');

module.exports = {

    //goes to server
    //gets all messages with given userid
    changeName: function(req, res, next){
        db.update_name([req.body.email, req.body.newName], function(err, user){
            console.log(req.body.email);
            console.log(req.body.newName);
        });
        res.sendStatus(200);
    },

    deleteAccount: function(req, res, next){
        console.log(req.body);
        db.delete_messages([req.body.id], function(err, user){
        });
        db.delete_account([req.body.id], function(err, user){
        });
        res.sendStatus(200);
    }

};
