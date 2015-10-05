'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

require('babel/polyfill');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var token = process.env.SLACK_API_KEY;
var slackURL = {
    protocol: 'https',
    slashes: true,
    host: 'slack.com'
};

function objToParam(obj) {
    var params = '';
    Object.keys(obj).forEach(function forEachKey(key) {
        if (params.length) params += '&';
        params += key + '=' + obj[key];
    });
    return params;
}

function prequest(getUrl) {
    return new Promise(function requestPromise(resolve, reject) {
        (0, _request2['default'])(getUrl, function requestCb(err, response, body) {
            if (err) reject(err);
            resolve({ response: response, body: body });
        });
    });
}

function makeURL(method, query) {
    var newURL = _extends({}, slackURL);
    newURL.pathname = 'api/' + method;
    newURL.search = objToParam(query);
    return _url2['default'].format(newURL);
}

exports['default'] = {

    getChannels: function getChannels() {
        var reqUrl = makeURL('channels.list', { token: token });
        return prequest(reqUrl);
    },

    historyOf: function historyOf(channel) {
        return new Promise(function (resolve, reject) {
            var history = [];
            var getHistory = function getHistory(latest) {
                if (latest === undefined) latest = Date.now() / 1000;
                var reqUrl = makeURL('channels.history', { token: token, channel: channel, latest: latest });
                (0, _request2['default'])(reqUrl, function (err, res, body) {
                    if (err) reject(err);
                    var data = JSON.parse(body);
                    history.push.apply(history, _toConsumableArray(data.messages));
                    if (data.has_more) {
                        getHistory(data.messages[data.messages.length - 1].ts);
                    } else resolve(history);
                });
            };
            getHistory();
        });
    },

    userInfo: function userInfo(user) {
        var reqUrl = makeURL('users.info', { token: token, user: user });
        return prequest(reqUrl);
    },

    userStatus: function userStatus(user) {
        var reqUrl = makeURL('users.getPresence', { token: token, user: user });
        return prequest(reqUrl);
    },

    getUsers: function getUsers() {
        var reqUrl = makeURL('users.list', { token: token });
        return prequest(reqUrl);
    }

};
module.exports = exports['default'];