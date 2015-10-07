'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cacher = require('cacher');

var _cacher2 = _interopRequireDefault(_cacher);

var _libAddPathsJs = require('./lib/addPaths.js');

var _libAddPathsJs2 = _interopRequireDefault(_libAddPathsJs);

var _apiSlackMessagesJs = require('./api/slack/messages.js');

var _apiSlackMessagesJs2 = _interopRequireDefault(_apiSlackMessagesJs);

var _apiSlackStatusJs = require('./api/slack/status.js');

var _apiSlackStatusJs2 = _interopRequireDefault(_apiSlackStatusJs);

var env = process.env.NODE_ENV || 'development';

var app = (0, _express2['default'])();
var cacher = new _cacher2['default']();
var addPaths = (0, _libAddPathsJs2['default'])(app);

var paths = {
    api: {
        slack: {
            messages: _apiSlackMessagesJs2['default'],
            status: _apiSlackStatusJs2['default']
        }
    }
};

if (env === 'production') {
    app.use(cacher.cache('days', 1));
}
addPaths(paths, '/');

app.listen(80);