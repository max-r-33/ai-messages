var app = require('../../server.js');

module.exports = {

    //goes to database,
    //creates user with given values
    signup: function(req, res, next){
        var db = app.get('db');
        db.create_user([req.body.name, req.body.email, req.body.password], function(err, user){
            if(err){
                res.send(err).status(500);
                return;
            }
            res.sendStatus(200);
        });
    }
};
