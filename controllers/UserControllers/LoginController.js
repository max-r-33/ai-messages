var app = require('../../server.js');
var db = app.get('db');

module.exports = {

    //goes to the database,
    //checks if there are an matching users
    login: function(req, res, next) {
        db.login_user([req.query.email], function(err, user) {
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
