/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var util = require('util'),
    BaseStore = require('./BaseStore');

function UserStore(context) {
    this.context = context;
    this.users = [];
}

UserStore.storeName = 'UserStore';
UserStore.handlers = {
    'CREATE_USER': 'createUser',
    'GET_USERS': 'getAll'
};

util.inherits(UserStore, BaseStore);

UserStore.prototype.createUser = function(user) {
    this.users.push(user);
    this.emitChange();
};

UserStore.prototype.getAll = function () {
    return this.users;
};

UserStore.prototype.dehydrate = function () {
    return {
        users: this.users
    };
};

UserStore.prototype.rehydrate = function (state) {
    this.users = state.users;
};

module.exports = UserStore;