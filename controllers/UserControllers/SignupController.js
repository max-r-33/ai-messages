var app = require('../../server.js');
var db = app.get('db');

module.exports = {

    //goes to database,
    //creates user with given values
    signup: function(req, res, next){
        db.create_user([req.body.name, req.body.email, req.body.password], function(err, user){
            if(err){
                res.send(err).status(500);
                return;
            }
            res.sendStatus(200);
        });
    }
};
