/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var util = require('util'),
    Fetcher = require('fetchr'),
    BaseStore = require('./BaseStore');

function UserStore(context) {
    this.context = context;
    this.users = [];
    this.fetcher = new Fetcher({
        xhrPath: "/api"
    });
}

UserStore.storeName = 'UserStore';
UserStore.handlers = {
    'CREATE_USER': 'createUser',
    'GET_USERS': 'getAll'
};

util.inherits(UserStore, BaseStore);

UserStore.prototype.createUser = function(user, callback) {
    var self = this;
    self.fetcher.create('user', user, self.context, function (err) {
        self.emitChange();
    });
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