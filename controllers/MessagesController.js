var app = require('../server.js');
var db = app.get('db');

module.exports = {
    //goes to server
    //gets all messages with given userid
    getAllMessages: function(req, res, next){
        db.get_user_messages([req.params.id], function(err, messages){
            if(err){
                res.status(500).send(err);
                return;
            }
            res.send(messages);
        });
    }
};
