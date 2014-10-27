'use strict';
var Immutable = require('immutable');

var _users = Immutable.Vector();

module.exports = {
    name: 'user',
    read: function(req, resource, params, config, callback) {
        callback(null, _users.toArray());
    },
    create: function(req, resource, params, body, config, callback) {
        var newUser = Immutable.Map({
            username: params.username,
            email: params.email
        });

        _users = _users.push(newUser);

        callback(null, _users.toArray());
    }
    //update: function(resource, params, body, config, callback) {},
    //delete: function(resource, params, config, callback) {}
};