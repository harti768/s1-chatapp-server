var jsonfile = require('jsonfile');

// TODO this is a highly experimental login it should never reach production in this state
module.exports = {
    login: function(username, password) {
        var user = this.__queryUserDb(function(entry) {
            return (entry["username"] == username
                && entry["password"] == password);
        });

        if (user)
            return user;

        throw 'invalid credentials';
    },

    authorize: function(token) {
        var user = this.__queryUserDb(function(entry) {
            return entry["token"] == token;
        });

        if (user)
            return user;

        throw 'invalid token';
    },

    __queryUserDb: function(closure) {
        var file = 'db/users.json';
        var userdb = jsonfile.readFileSync(file);
        var user = null;

        userdb.forEach(function (entry) {
            if (!user && closure(entry)) {
                user = entry;
            }
        });

        return user;
    }
};