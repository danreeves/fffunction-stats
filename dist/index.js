'use strict';

var _this = this;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiMessageCountJs = require('./api/messageCount.js');

var _apiMessageCountJs2 = _interopRequireDefault(_apiMessageCountJs);

var _apiSlackStatusJs = require('./api/slackStatus.js');

var _apiSlackStatusJs2 = _interopRequireDefault(_apiSlackStatusJs);

var app = (0, _express2['default'])();

app.get('/api/slack_messages', function callee$0$0(req, res) {
    var data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap((0, _apiMessageCountJs2['default'])());

            case 2:
                data = context$1$0.sent;

                res.json(data);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
});

app.get('/api/slack_status', function callee$0$0(req, res) {
    var data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap((0, _apiSlackStatusJs2['default'])());

            case 2:
                data = context$1$0.sent;

                res.json(data);

            case 4:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
});

app.listen(80);