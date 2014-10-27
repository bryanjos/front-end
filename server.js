require('node-jsx').install({ extension: '.jsx' });

var http = require('http'),
    express = require('express'),
    expressState = require('express-state'),
    navigateAction = require('flux-router-component').navigateAction,
    React = require('react'),
    Application = require('./app'),
    bodyParser = require('body-parser'),
    Fetcher = require('fetchr');

var app = express();
expressState.extend(app);

app.set('state namespace', 'App');
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.use(bodyParser.json());

Fetcher.registerFetcher(require('./fetchers/user'));
app.use(Application.config.xhrPath, Fetcher.middleware());

app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    var fetcher = new Fetcher({
        req: req
    });
    var application = new Application({
        fetcher: fetcher
    });


    application.context.getActionContext().executeAction(navigateAction, {
        path: req.path
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        var html = React.renderComponentToString(application.getComponent());

        res.expose(application.context.dehydrate(), 'Context');
        res.render('layout', { html: html }, function (err, markup) {
            if (err) {
                next(err);
            }
            res.send(markup);
        });
    });
});

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Listening on port ' + port);