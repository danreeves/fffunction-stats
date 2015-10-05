'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiMessageCountJs = require('./api/messageCount.js');

var _apiMessageCountJs2 = _interopRequireDefault(_apiMessageCountJs);

var _apiSlackStatusJs = require('./api/slackStatus.js');

var _apiSlackStatusJs2 = _interopRequireDefault(_apiSlackStatusJs);

var app = (0, _express2['default'])();

app.get('/api/slack_messages', function (req, res) {
    (0, _apiMessageCountJs2['default'])().then(function (d) {
        res.json(d);
    });
});

app.get('/api/slack_status', function (req, res) {
    (0, _apiSlackStatusJs2['default'])().then(function (d) {
        res.json(d);
    });
});

app.listen(80);