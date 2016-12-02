var app = require('../server.js');

module.exports = {

    //goes to server
    //gets all messages with given userid
    changeName: function(req, res, next){
        var db = app.get('db');
        db.update_name([req.body.email, req.body.newName], function(err, user){
            console.log(req.body.email);
            console.log(req.body.newName);
        });
        res.send(200);
    },

    deleteAccount: function(req, res, next){
        var db = app.get('db');
        console.log(req.body);
        db.delete_messages([req.body.id], function(err, user){
        });
        db.delete_account([req.body.id], function(err, user){
        });
        res.send(200);
    }

};
