var app = require('../../server.js');
var db = app.get('db');

module.exports = {

    //goes to server
    //gets all messages with given userid
    changeName: function(req, res, next){
        db.update_name([req.body.email, req.body.newName], function(err, user){
            if(err){
                res.send(error).status(404);
            }
        });
        res.sendStatus(200);
    },

    //deletes users messages by id,
    // then deletes their account
    deleteAccount: function(req, res, next){
        db.delete_messages([req.body.id], function(err, user){
        });
        db.delete_account([req.body.id], function(err, user){
        });
        res.sendStatus(200);
    }

};
