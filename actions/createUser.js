/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:createUserAction'),
    UserStore = require('../stores/UserStore');

// `this` is the action controller context with `dispatch`, `getStore`, and `executeAction` methods
module.exports = function (context, payload, done) {
    var userStore = context.getStore(UserStore),
    user = {
        username: payload.username,
        email: payload.email
    };

    debug('dispatching CREATE_USER', user);
    context.dispatch('CREATE_USER', user);
//    context.fetcher.create('user', user, context, function (err) {
//        if (err) {
//            context.dispatch('CREATE_USER_FAILURE', user);
//            done();
//            return;
//        }
//        context.dispatch('CREATE_USER__SUCCESS', user);
//        done();
//    });
};