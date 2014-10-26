/*global App, document, window */
'use strict';
require('./app.scss');

var React = require('react'),
    debug = require('debug'),
    bootstrapDebug = debug('Example'),
    Fetcher = require('fetchr'),
    Application = require('./app'),
    fetcher = new Fetcher({
        xhrPath: Application.config.xhrPath
    }),
    dehydratedState = Application && Application.Context; // Sent from the server

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
var application = new Application({
    fetcher: fetcher,
    initialState: dehydratedState
});
window.context = application.context;

var app = application.getComponent(),
    mountNode = document.getElementById('app');

bootstrapDebug('React Rendering');
React.renderComponent(app, mountNode, function () {
    bootstrapDebug('React Rendered');
});