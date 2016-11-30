var app = require('../../server.js');

module.exports = {

    //goes to the database,
    //checks if there are an matching users
    login: function(req, res, next) {
        var db = app.get('db');
        db.login_user([req.body.email, req.body.password], function(err, user) {
            if (user.length > 0) {
                res.send(user).status(200);
            } else {
                res.send({
                    error: 'user not found'
                }).status(404);
            }
        });
    }
};
