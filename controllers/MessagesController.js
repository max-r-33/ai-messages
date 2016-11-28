var app = require('../server.js');

module.exports = {
    getAllMessages: function(req, res, next){
        var db = app.get('db');
        db.get_user_messages([req.params.id], function(err, messages){
            if(err){
                res.status(500).send(err);
                return;
            }
            res.send(messages);
        });
    },
};
