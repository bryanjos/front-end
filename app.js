/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Context = require('./Context'),
    ApplicationStore = require('./stores/ApplicationStore'),
    UserStore = require('./stores/UserStore'),
    Application = require('./components/Application.jsx'),
    routes = require('./configs/routes');

Context.registerStore(ApplicationStore);
Context.registerStore(UserStore);

function App(options) {
    options = options || {};
    var fetcher = options.fetcher;
    var initialState = options.initialState;

    this.context = new Context({
        routes: routes,
        fetcher: fetcher
    });

    if (initialState) {
        this.context.rehydrate(initialState);
    }
}

App.prototype.getComponent = function () {
    var appComponent = Application({context: this.context.getComponentContext()});
    return appComponent;
};

module.exports = App;
module.exports.config = {
    xhrPath: '/api'
}