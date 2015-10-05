'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = getSlackMessageCount;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _libSlackJs = require('../lib/slack.js');

var _libSlackJs2 = _interopRequireDefault(_libSlackJs);

var channels = _libSlackJs2['default'].getChannels();
var channelArray = [];
var messages = [];
var messageCount = {};
var userIDs = [];

var historyOf = function historyOf(channel) {
    return _libSlackJs2['default'].historyOf(channel.id);
};
var countUserMessages = function countUserMessages(a, b) {
    if (a[b.user]) a[b.user]++;else a[b.user] = 1;
    return a;
};
var userMessageCount = function userMessageCount(response) {
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

function getSlackMessageCount() {
    return new Promise(function (resolve, reject) {

        channels.then(function gotChannels(data) {
            channelArray = JSON.parse(data.body).channels;
            return Promise.all(channelArray.map(historyOf));
        }).then(function gotHistories(data) {
            messages = data.reduce(function (a, b) {
                return a.concat.apply(a, _toConsumableArray(b));
            });
            messageCount = messages.reduce(countUserMessages, {});
            userIDs = Object.keys(messageCount);
            return Promise.all(userIDs.map(function (id) {
                return _libSlackJs2['default'].userInfo(id);
            }));
        }).then(function gotUsers(data) {
            messageCount = data.map(userMessageCount).filter(function (v) {
                return Object.keys(v).length;
            });
            resolve(messageCount);
        })['catch'](reject);
    });
}

module.exports = exports['default'];