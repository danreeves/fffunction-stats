'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _libSlackJs = require('../../lib/slack.js');

var _libSlackJs2 = _interopRequireDefault(_libSlackJs);

var countUserMessages = function countUserMessages(a, b) {
    if (a[b.user]) a[b.user]++;else a[b.user] = 1;
    return a;
};

var userMessageCount = function userMessageCount(messageCount) {
    return function (response) {
        var data = JSON.parse(response.body);
        var user = {};
        if ('user' in data) {
            if (String(data.user.profile.email).includes('@fffunction.co')) {
                user.email = data.user.profile.email;
                user.messages = messageCount[data.user.id];
            }
        }
        return user;
    };
};

exports['default'] = function getSlackMessageCount() {
    var channelsResponse, channelArray, allHistories, allMessages, messageCount, userIDs, allUsers;
    return regeneratorRuntime.async(function getSlackMessageCount$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_libSlackJs2['default'].getChannels());

            case 2:
                channelsResponse = context$1$0.sent;
                channelArray = JSON.parse(channelsResponse.body).channels;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(Promise.all(channelArray.map(function (channel) {
                    return _libSlackJs2['default'].historyOf(channel.id);
                })));

            case 6:
                allHistories = context$1$0.sent;
                allMessages = allHistories.reduce(function (a, b) {
                    return a.concat.apply(a, _toConsumableArray(b));
                });
                messageCount = allMessages.reduce(countUserMessages, {});
                userIDs = Object.keys(messageCount);
                context$1$0.next = 12;
                return regeneratorRuntime.awrap(Promise.all(userIDs.map(function (id) {
                    return _libSlackJs2['default'].userInfo(id);
                })));

            case 12:
                allUsers = context$1$0.sent;
                context$1$0.next = 15;
                return regeneratorRuntime.awrap(allUsers.map(userMessageCount(messageCount)).filter(function (v) {
                    return Object.keys(v).length;
                }));

            case 15:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 16:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = exports['default'];