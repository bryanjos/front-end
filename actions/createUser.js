/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var UserStore = require('../stores/UserStore');

// `this` is the action controller context with `dispatch`, `getStore`, and `executeAction` methods
module.exports = function (context, payload, done) {
    var userStore = context.getStore(UserStore),
    var user = {
        username: payload.username,
        email: payload.email
    };

    context.dispatch('CREATE_USER', user);
};